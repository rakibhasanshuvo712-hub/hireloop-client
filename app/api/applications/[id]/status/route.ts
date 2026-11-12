import { NextRequest } from "next/server"
import { getApplicationsCollection, getCompaniesCollection } from "@/lib/types/database"
import { applicationStatusUpdateSchema } from "@/lib/validations"
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
    const { id } = await params
    const appObjectId = toObjectId(id)
    if (!appObjectId) {
      return apiError("Invalid application ID format", 400)
    }

    const appsCol = await getApplicationsCollection()
    const application = await appsCol.findOne({ _id: appObjectId })
    if (!application) {
      return apiError("Application not found", 404)
    }

    // Check authorization: Recruiter owning the company or Admin
    const companiesCol = await getCompaniesCollection()
    const company = await companiesCol.findOne({ _id: application.companyId })

    const isOwningRecruiter =
      user.role === "Recruiter" &&
      company &&
      company.recruiterId &&
      company.recruiterId.toString() === user.id

    const isAdmin = user.role === "Admin"

    if (!isAdmin && !isOwningRecruiter) {
      return apiError(
        "Access denied. Only the hiring recruiter or platform admin can update candidate application stage.",
        403
      )
    }

    const json = await req.json()
    const parsed = applicationStatusUpdateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const { status } = parsed.data

    await appsCol.updateOne(
      { _id: appObjectId },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    )

    const updated = await appsCol.findOne({ _id: appObjectId })

    return apiSuccess(updated)
  } catch (error: any) {
    console.error("PATCH /api/applications/[id]/status error:", error)
    return apiError("Failed to update application status", 500)
  }
}
