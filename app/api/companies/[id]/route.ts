import { NextRequest } from "next/server"
import { getCompaniesCollection, getJobsCollection } from "@/lib/types/database"
import { apiSuccess, apiError } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const companyObjectId = toObjectId(id)
    if (!companyObjectId) {
      return apiError("Invalid company ID format", 400)
    }

    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: companyObjectId })
    if (!company) {
      return apiError("Company not found", 404)
    }

    const jobsCol = await getJobsCollection()
    const openJobs = await jobsCol
      .find({
        companyId: companyObjectId,
        status: "Active",
      })
      .sort({ createdAt: -1 })
      .toArray()

    return apiSuccess({
      ...company,
      openJobs,
      openJobsCount: openJobs.length,
    })
  } catch (error: any) {
    console.error("GET /api/companies/[id] error:", error)
    return apiError("Failed to fetch company", 500)
  }
}
