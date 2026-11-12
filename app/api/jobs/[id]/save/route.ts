import { NextRequest } from "next/server"
import { getSavedJobsCollection, getJobsCollection, SavedJobDoc } from "@/lib/types/database"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const { id } = await params
    const jobObjectId = toObjectId(id)
    const userObjectId = toObjectId(user.id)

    if (!jobObjectId || !userObjectId) {
      return apiError("Invalid ID format", 400)
    }

    const savedCol = await getSavedJobsCollection()
    const existing = await savedCol.findOne({
      seekerId: userObjectId,
      jobId: jobObjectId,
    })

    return apiSuccess({ saved: !!existing })
  } catch (error: any) {
    console.error("GET /api/jobs/[id]/save error:", error)
    return apiError("Failed to check saved status", 500)
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const { id } = await params
    const jobObjectId = toObjectId(id)
    const userObjectId = toObjectId(user.id)

    if (!jobObjectId || !userObjectId) {
      return apiError("Invalid ID format", 400)
    }

    const jobsCol = await getJobsCollection()
    const job = await jobsCol.findOne({ _id: jobObjectId })
    if (!job) {
      return apiError("Job not found", 404)
    }

    const savedCol = await getSavedJobsCollection()
    const existing = await savedCol.findOne({
      seekerId: userObjectId,
      jobId: jobObjectId,
    })

    if (existing) {
      // Toggle off / unsave
      await savedCol.deleteOne({ _id: existing._id })
      return apiSuccess({
        saved: false,
        message: "Job removed from saved list",
      })
    } else {
      // Check seeker free plan saved job limit (10 jobs)
      if (user.plan === "Free") {
        const savedCount = await savedCol.countDocuments({ seekerId: userObjectId })
        if (savedCount >= 10) {
          return apiError("Free plan limit reached: you can only save up to 10 jobs. Upgrade to Pro for unlimited saves.", 403)
        }
      }

      // Save job
      const newSaved: SavedJobDoc = {
        _id: new ObjectId(),
        seekerId: userObjectId,
        jobId: jobObjectId,
        savedAt: new Date(),
      }
      await savedCol.insertOne(newSaved)

      return apiSuccess({
        saved: true,
        message: "Job saved successfully",
      })
    }
  } catch (error: any) {
    console.error("POST /api/jobs/[id]/save error:", error)
    return apiError("Failed to toggle saved job", 500)
  }
}
