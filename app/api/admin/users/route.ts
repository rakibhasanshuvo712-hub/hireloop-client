import { NextRequest } from "next/server"
import { getUsersCollection } from "@/lib/types/database"
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
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const filter: any = {}
    if (role && role !== "All") {
      filter.role = role
    }
    if (status && status !== "All") {
      filter.status = status
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    const usersCol = await getUsersCollection()
    const users = await usersCol
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return apiSuccess(users)
  } catch (error: any) {
    console.error("GET /api/admin/users error:", error)
    return apiError("Failed to fetch admin users", 500)
  }
}
