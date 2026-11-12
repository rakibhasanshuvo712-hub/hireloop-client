import { NextRequest } from "next/server"
import { getCompaniesCollection } from "@/lib/types/database"
import { adminCompanyStatusSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    if (user.role !== "Admin") {
      return apiError("Access denied. Admin privileges required.", 403)
    }

    const { id } = await params
    const companyObjectId = toObjectId(id)
    if (!companyObjectId) {
      return apiError("Invalid company ID format", 400)
    }

    const json = await req.json()
    const parsed = adminCompanyStatusSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: companyObjectId })
    if (!company) {
      return apiError("Company not found", 404)
    }

    const { status } = parsed.data

    await companiesCol.updateOne(
      { _id: companyObjectId },
      {
        $set: {
          status,
        },
      }
    )

    const updated = await companiesCol.findOne({ _id: companyObjectId })

    return apiSuccess(updated)
  } catch (error: any) {
    console.error("PATCH /api/admin/companies/[id] error:", error)
    return apiError("Failed to update company status", 500)
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    if (user.role !== "Admin") {
      return apiError("Access denied. Admin privileges required.", 403)
    }

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

    return apiSuccess(company)
  } catch (error: any) {
    console.error("GET /api/admin/companies/[id] error:", error)
    return apiError("Failed to fetch company", 500)
  }
}
