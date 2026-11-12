import { NextRequest } from "next/server"
import { getUsersCollection } from "@/lib/types/database"
import { adminUserUpdateSchema } from "@/lib/validations"
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
    const userObjectId = toObjectId(id)
    if (!userObjectId) {
      return apiError("Invalid user ID format", 400)
    }

    const json = await req.json()
    const parsed = adminUserUpdateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const usersCol = await getUsersCollection()
    const targetUser = await usersCol.findOne({ _id: userObjectId })
    if (!targetUser) {
      return apiError("User not found", 404)
    }

    // Prevent admin from suspending themselves
    if (user.id === id && parsed.data.status === "Suspended") {
      return apiError("You cannot suspend your own admin account", 400)
    }

    const updateFields: any = {
      updatedAt: new Date(),
    }
    if (parsed.data.role) {
      updateFields.role = parsed.data.role
    }
    if (parsed.data.status) {
      updateFields.status = parsed.data.status
    }

    await usersCol.updateOne({ _id: userObjectId }, { $set: updateFields })
    const updatedUser = await usersCol.findOne({ _id: userObjectId })

    return apiSuccess(updatedUser)
  } catch (error: any) {
    console.error("PATCH /api/admin/users/[id] error:", error)
    return apiError("Failed to update user", 500)
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
    const userObjectId = toObjectId(id)
    if (!userObjectId) {
      return apiError("Invalid user ID format", 400)
    }

    const usersCol = await getUsersCollection()
    const targetUser = await usersCol.findOne({ _id: userObjectId })
    if (!targetUser) {
      return apiError("User not found", 404)
    }

    return apiSuccess(targetUser)
  } catch (error: any) {
    console.error("GET /api/admin/users/[id] error:", error)
    return apiError("Failed to fetch user", 500)
  }
}
