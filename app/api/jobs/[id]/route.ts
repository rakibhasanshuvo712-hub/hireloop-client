import { NextRequest } from "next/server"
import { getJobsCollection, getCompaniesCollection } from "@/lib/types/database"
import { jobUpdateSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const jobObjectId = toObjectId(id)
    if (!jobObjectId) {
      return apiError("Invalid job ID format", 400)
    }

    const jobsCol = await getJobsCollection()
    const job = await jobsCol.findOne({ _id: jobObjectId })

    if (!job) {
      return apiError("Job not found", 404)
    }

    // Populate company details
    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: job.companyId })

    const result = {
      ...job,
      companyOverview: company
        ? {
            about: company.about,
            industry: company.industry,
            size: company.size,
            website: company.website,
            location: company.location,
            status: company.status,
          }
        : null,
    }

    return apiSuccess(result)
  } catch (error: any) {
    console.error("GET /api/jobs/[id] error:", error)
    return apiError("Failed to fetch job", 500)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const { id } = await params
    const jobObjectId = toObjectId(id)
    if (!jobObjectId) {
      return apiError("Invalid job ID format", 400)
    }

    const jobsCol = await getJobsCollection()
    const existingJob = await jobsCol.findOne({ _id: jobObjectId })
    if (!existingJob) {
      return apiError("Job not found", 404)
    }

    // Permission check: Admin or owning recruiter
    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: existingJob.companyId })

    const isOwningRecruiter =
      user.role === "Recruiter" &&
      company &&
      company.recruiterId &&
      company.recruiterId.toString() === user.id

    const isAdmin = user.role === "Admin"

    if (!isAdmin && !isOwningRecruiter) {
      return apiError("Access denied. You do not have permission to edit this job.", 403)
    }

    const json = await req.json()
    const parsed = jobUpdateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const updateData: any = {
      ...parsed.data,
      updatedAt: new Date(),
    }

    // Prevent overwriting companyId or _id
    delete updateData._id
    delete updateData.companyId

    await jobsCol.updateOne({ _id: jobObjectId }, { $set: updateData })
    const updatedJob = await jobsCol.findOne({ _id: jobObjectId })

    return apiSuccess(updatedJob)
  } catch (error: any) {
    console.error("PATCH /api/jobs/[id] error:", error)
    return apiError("Failed to update job", 500)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const { id } = await params
    const jobObjectId = toObjectId(id)
    if (!jobObjectId) {
      return apiError("Invalid job ID format", 400)
    }

    const jobsCol = await getJobsCollection()
    const existingJob = await jobsCol.findOne({ _id: jobObjectId })
    if (!existingJob) {
      return apiError("Job not found", 404)
    }

    // Check ownership or admin
    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: existingJob.companyId })

    const isOwningRecruiter =
      user.role === "Recruiter" &&
      company &&
      company.recruiterId &&
      company.recruiterId.toString() === user.id

    const isAdmin = user.role === "Admin"

    if (!isAdmin && !isOwningRecruiter) {
      return apiError("Access denied. You can only delete your own jobs.", 403)
    }

    await jobsCol.deleteOne({ _id: jobObjectId })

    return apiSuccess({ deleted: true, jobId: id })
  } catch (error: any) {
    console.error("DELETE /api/jobs/[id] error:", error)
    return apiError("Failed to delete job", 500)
  }
}
