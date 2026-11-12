import { NextRequest } from "next/server"
import { getJobsCollection, getCompaniesCollection, JobDoc, JobCategory, JobType, JobStatus } from "@/lib/types/database"
import { jobCreateSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

const RECRUITER_PLAN_LIMITS: Record<string, number> = {
  Free: 3,
  Growth: 10,
  Enterprise: 50,
  Pro: 10,
  Premium: 50,
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")?.trim()
    const category = searchParams.get("category")?.trim()
    const type = searchParams.get("type")?.trim()
    const location = searchParams.get("location")?.trim()
    const statusParam = searchParams.get("status")?.trim()
    const companyIdParam = searchParams.get("companyId")?.trim()
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)))
    const skip = (page - 1) * limit

    const filter: any = {}

    if (statusParam) {
      filter.status = statusParam
    } else {
      filter.status = "Active"
    }

    if (category && category !== "All") {
      filter.category = category as JobCategory
    }

    if (type && type !== "All") {
      filter.type = type as JobType
    }

    if (location && location !== "All") {
      filter.location = { $regex: location, $options: "i" }
    }

    if (companyIdParam) {
      const cId = toObjectId(companyIdParam)
      if (cId) filter.companyId = cId
    }

    if (q) {
      const searchRegex = { $regex: q, $options: "i" }
      filter.$or = [
        { title: searchRegex },
        { companyName: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
      ]
    }

    const jobsCol = await getJobsCollection()
    const [jobs, total] = await Promise.all([
      jobsCol
        .find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      jobsCol.countDocuments(filter),
    ])

    return apiSuccess({
      jobs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("GET /api/jobs error:", error)
    return apiError("Failed to fetch jobs", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    if (user.role !== "Recruiter" && user.role !== "Admin") {
      return apiError("Access denied. Only recruiters can post jobs.", 403)
    }

    const json = await req.json()
    const parsed = jobCreateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const data = parsed.data
    const companiesCol = await getCompaniesCollection()
    const userObjectId = toObjectId(user.id)

    // Find recruiter's company
    let company = null
    if (user.companyId) {
      company = await companiesCol.findOne({ _id: toObjectId(user.companyId)! })
    }
    if (!company && userObjectId) {
      company = await companiesCol.findOne({ recruiterId: userObjectId })
    }

    if (!company) {
      return apiError(
        "You must register a company profile before posting jobs.",
        403
      )
    }

    if (company.status !== "Approved" && user.role !== "Admin") {
      return apiError(
        `Company "${company.name}" is currently ${company.status.toLowerCase()}. Only approved companies can publish jobs.`,
        403
      )
    }

    // Check active plan limits
    const jobsCol = await getJobsCollection()
    const userPlan = user.plan || "Free"
    const maxActiveJobs = RECRUITER_PLAN_LIMITS[userPlan] || 3

    if (user.role !== "Admin" && data.status === "Active") {
      const currentActiveCount = await jobsCol.countDocuments({
        companyId: company._id,
        status: "Active",
      })

      if (currentActiveCount >= maxActiveJobs) {
        return apiError(
          `You have reached the maximum of ${maxActiveJobs} active jobs for the ${userPlan} plan. Please upgrade your plan to post more jobs.`,
          403
        )
      }
    }

    const newJob: JobDoc = {
      _id: new ObjectId(),
      title: data.title,
      companyId: company._id,
      companyName: company.name,
      companyLogo: company.logo || data.companyLogo || "/logos/placeholder.png",
      location: data.location,
      type: data.type,
      category: data.category,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      experience: data.experience,
      workLevel: data.workLevel,
      deadline: data.deadline,
      description: data.description,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      benefits: data.benefits,
      status: data.status,
      featured: data.featured,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await jobsCol.insertOne(newJob)

    return apiSuccess(newJob, 201)
  } catch (error: any) {
    console.error("POST /api/jobs error:", error)
    return apiError("Failed to create job", 500)
  }
}
