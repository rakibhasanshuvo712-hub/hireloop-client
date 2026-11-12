import { NextRequest } from "next/server"
import { getUsersCollection } from "@/lib/types/database"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { z } from "zod"

const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  resumeUrl: z.string().url().or(z.string().length(0)).optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const userObjectId = toObjectId(auth!.user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const usersCol = await getUsersCollection()
    const userDoc = await usersCol.findOne({ _id: userObjectId })

    if (!userDoc) {
      return apiError("User not found", 404)
    }

    return apiSuccess({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      status: userDoc.status,
      plan: userDoc.plan,
      companyId: userDoc.companyId?.toString(),
      resumeUrl: userDoc.resumeUrl || "",
      headline: userDoc.headline || "",
      bio: userDoc.bio || "",
      skills: userDoc.skills || [],
      createdAt: userDoc.createdAt,
    })
  } catch (error: any) {
    console.error("GET /api/user/profile error:", error)
    return apiError("Failed to fetch profile", 500)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const userObjectId = toObjectId(auth!.user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const json = await req.json()
    const parsed = profileUpdateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const usersCol = await getUsersCollection()
    const updateData: any = {
      ...parsed.data,
      updatedAt: new Date(),
    }

    await usersCol.updateOne({ _id: userObjectId }, { $set: updateData })
    const updated = await usersCol.findOne({ _id: userObjectId })

    return apiSuccess(updated)
  } catch (error: any) {
    console.error("PATCH /api/user/profile error:", error)
    return apiError("Failed to update profile", 500)
  }
}
