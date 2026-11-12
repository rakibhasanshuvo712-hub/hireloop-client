import { NextRequest } from "next/server"
import { seedDatabase } from "@/lib/seed"
import { apiSuccess, apiError } from "@/lib/api-response"

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const force = searchParams.get("force") === "true"

    const result = await seedDatabase(force)
    return apiSuccess(result)
  } catch (error: any) {
    console.error("POST /api/seed error:", error)
    return apiError("Failed to seed database: " + error.message, 500)
  }
}

export async function GET() {
  try {
    const result = await seedDatabase(false)
    return apiSuccess(result)
  } catch (error: any) {
    console.error("GET /api/seed error:", error)
    return apiError("Failed to seed database: " + error.message, 500)
  }
}
