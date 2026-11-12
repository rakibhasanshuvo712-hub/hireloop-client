import { NextRequest } from "next/server"
import { getCompaniesCollection } from "@/lib/types/database"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"

export async function GET(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    if (user.role !== "Admin") {
      return apiError("Access denied. Admin privileges required.", 403)
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const filter: any = {}
    if (status && status !== "All") {
      filter.status = status
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { industry: { $regex: search, $options: "i" } },
      ]
    }

    const companiesCol = await getCompaniesCollection()
    const companies = await companiesCol
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return apiSuccess(companies)
  } catch (error: any) {
    console.error("GET /api/admin/companies error:", error)
    return apiError("Failed to fetch admin companies", 500)
  }
}
