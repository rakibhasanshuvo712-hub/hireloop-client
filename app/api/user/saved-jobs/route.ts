import { NextRequest } from "next/server"
import { getSavedJobsCollection } from "@/lib/types/database"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"

export async function GET(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const userObjectId = toObjectId(auth!.user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const savedCol = await getSavedJobsCollection()

    // Aggregate with jobs collection to return full job details
    const savedJobs = await savedCol
      .aggregate([
        { $match: { seekerId: userObjectId } },
        { $sort: { savedAt: -1 } },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        {
          $project: {
            _id: "$job._id",
            title: "$job.title",
            companyId: "$job.companyId",
            companyName: "$job.companyName",
            companyLogo: "$job.companyLogo",
            location: "$job.location",
            type: "$job.type",
            category: "$job.category",
            salaryMin: "$job.salaryMin",
            salaryMax: "$job.salaryMax",
            experience: "$job.experience",
            workLevel: "$job.workLevel",
            deadline: "$job.deadline",
            description: "$job.description",
            status: "$job.status",
            featured: "$job.featured",
            savedAt: "$savedAt",
          },
        },
      ])
      .toArray()

    return apiSuccess(savedJobs)
  } catch (error: any) {
    console.error("GET /api/user/saved-jobs error:", error)
    return apiError("Failed to fetch saved jobs", 500)
  }
}
