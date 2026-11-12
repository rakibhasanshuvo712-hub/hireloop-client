import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { UserRole } from "@/lib/types/database"

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function apiError(error: string, status: number = 400) {
  return NextResponse.json({ success: false, error }, { status })
}

export interface AuthContext {
  session: any
  user: {
    id: string
    name: string
    email: string
    role: UserRole
    status: "Active" | "Suspended"
    plan: "Free" | "Pro" | "Premium" | "Growth" | "Enterprise"
    companyId?: string
    resumeUrl?: string
    headline?: string
    bio?: string
    skills?: string[]
  }
}

export async function getAuthContext(): Promise<{
  auth: AuthContext | null
  errorResponse: NextResponse | null
}> {
  try {
    const headerList = await headers()
    const session = await auth.api.getSession({
      headers: headerList,
    })

    if (!session || !session.user) {
      return {
        auth: null,
        errorResponse: apiError("Authentication required. Please log in.", 401),
      }
    }

    const user = session.user as any

    if (user.status === "Suspended") {
      return {
        auth: null,
        errorResponse: apiError("Your account has been suspended. Please contact support.", 403),
      }
    }

    return {
      auth: {
        session,
        user: {
          id: user.id || user._id?.toString(),
          name: user.name,
          email: user.email,
          role: (user.role || "Seeker") as UserRole,
          status: (user.status || "Active") as "Active" | "Suspended",
          plan: (user.plan || "Free") as any,
          companyId: user.companyId?.toString(),
          resumeUrl: user.resumeUrl,
          headline: user.headline,
          bio: user.bio,
          skills: user.skills || [],
        },
      },
      errorResponse: null,
    }
  } catch (error: any) {
    console.error("Error retrieving auth session:", error)
    return {
      auth: null,
      errorResponse: apiError("Failed to authenticate session", 500),
    }
  }
}
