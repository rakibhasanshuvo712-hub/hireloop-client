import { NextRequest } from "next/server"
import {
  getApplicationsCollection,
  getJobsCollection,
  getCompaniesCollection,
  ApplicationDoc,
} from "@/lib/types/database"
import { applicationCreateSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const userObjectId = toObjectId(user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get("status")
    const jobIdParam = searchParams.get("jobId")

    const appsCol = await getApplicationsCollection()
    const filter: any = {}

    if (statusParam) {
      filter.status = statusParam
    }

    if (jobIdParam) {
      const jId = toObjectId(jobIdParam)
      if (jId) filter.jobId = jId
    }

    if (user.role === "Seeker") {
      filter.seekerId = userObjectId
    } else if (user.role === "Recruiter") {
      const companiesCol = await getCompaniesCollection()
      let company = null
      if (user.companyId) {
        company = await companiesCol.findOne({ _id: toObjectId(user.companyId)! })
      }
      if (!company) {
        company = await companiesCol.findOne({ recruiterId: userObjectId })
      }

      if (!company) {
        return apiSuccess([])
      }
      filter.companyId = company._id
    } else if (user.role !== "Admin") {
      filter.seekerId = userObjectId
    }

    // Aggregate with jobs to get job title, company name, logo
    const applications = await appsCol
      .aggregate([
        { $match: filter },
        { $sort: { appliedAt: -1 } },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            jobId: 1,
            seekerId: 1,
            companyId: 1,
            applicantName: 1,
            applicantEmail: 1,
            resumeUrl: 1,
            coverNote: 1,
            status: 1,
            appliedAt: 1,
            updatedAt: 1,
            jobTitle: "$job.title",
            jobLocation: "$job.location",
            jobType: "$job.type",
            companyName: "$job.companyName",
            companyLogo: "$job.companyLogo",
          },
        },
      ])
      .toArray()

    return apiSuccess(applications)
  } catch (error: any) {
    console.error("GET /api/applications error:", error)
    return apiError("Failed to fetch applications", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const userObjectId = toObjectId(user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const json = await req.json()
    const parsed = applicationCreateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const { jobId, applicantName, applicantEmail, resumeUrl, coverNote } = parsed.data
    const jobObjectId = toObjectId(jobId)
    if (!jobObjectId) {
      return apiError("Invalid job ID format", 400)
    }

    const jobsCol = await getJobsCollection()
    const job = await jobsCol.findOne({ _id: jobObjectId })
    if (!job) {
      return apiError("Job not found", 404)
    }

    if (job.status !== "Active") {
      return apiError("This job is no longer accepting applications", 400)
    }

    const appsCol = await getApplicationsCollection()

    // Check duplicate application
    const existing = await appsCol.findOne({
      seekerId: userObjectId,
      jobId: jobObjectId,
    })
    if (existing) {
      return apiError("You have already applied for this job", 400)
    }

    // Enforce monthly limits based on seeker plan
    // Free: 3 per month
    // Pro: 30 per month
    // Premium: unlimited
    const plan = user.plan || "Free"
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const monthlyCount = await appsCol.countDocuments({
      seekerId: userObjectId,
      appliedAt: { $gte: startOfMonth },
    })

    if (plan === "Free" && monthlyCount >= 3) {
      return apiError(
        "You have reached your Free plan limit of 3 job applications this month. Upgrade to Pro to submit up to 30 applications per month.",
        403
      )
    }

    if (plan === "Pro" && monthlyCount >= 30) {
      return apiError(
        "You have reached your Pro plan limit of 30 job applications this month. Upgrade to Premium for unlimited applications.",
        403
      )
    }

    const newApp: ApplicationDoc = {
      _id: new ObjectId(),
      jobId: jobObjectId,
      seekerId: userObjectId,
      companyId: job.companyId,
      applicantName,
      applicantEmail,
      resumeUrl,
      coverNote,
      status: "Applied",
      appliedAt: new Date(),
      updatedAt: new Date(),
    }

    await appsCol.insertOne(newApp)

    return apiSuccess(newApp, 201)
  } catch (error: any) {
    // Check MongoDB duplicate key error code 11000
    if (error?.code === 11000) {
      return apiError("You have already applied for this job", 400)
    }
    console.error("POST /api/applications error:", error)
    return apiError("Failed to submit application", 500)
  }
}
