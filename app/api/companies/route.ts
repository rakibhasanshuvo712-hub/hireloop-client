import { NextRequest } from "next/server"
import { getCompaniesCollection, getUsersCollection, CompanyDoc } from "@/lib/types/database"
import { companyCreateSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const industry = searchParams.get("industry")
    const search = searchParams.get("search")
    const status = searchParams.get("status") || "Approved"

    const filter: any = {}
    if (status !== "All") {
      filter.status = status
    }
    if (industry && industry !== "All") {
      filter.industry = { $regex: industry, $options: "i" }
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { about: { $regex: search, $options: "i" } },
      ]
    }

    const companiesCol = await getCompaniesCollection()
    const companies = await companiesCol
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return apiSuccess(companies)
  } catch (error: any) {
    console.error("GET /api/companies error:", error)
    return apiError("Failed to fetch companies", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const userObjectId = toObjectId(user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    if (user.role !== "Recruiter" && user.role !== "Admin") {
      return apiError("Only recruiters can register a company profile", 403)
    }

    const json = await req.json()
    const parsed = companyCreateSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const companiesCol = await getCompaniesCollection()

    // Check if recruiter already has a company registered
    const existing = await companiesCol.findOne({ recruiterId: userObjectId })
    if (existing) {
      return apiError("You have already registered a company profile", 400)
    }

    const newCompany: CompanyDoc = {
      _id: new ObjectId(),
      name: parsed.data.name,
      logo: parsed.data.logo || "/logos/placeholder.png",
      industry: parsed.data.industry,
      location: parsed.data.location,
      size: parsed.data.size,
      website: parsed.data.website,
      about: parsed.data.about,
      recruiterId: userObjectId,
      status: user.role === "Admin" ? "Approved" : "Pending",
      createdAt: new Date(),
    }

    await companiesCol.insertOne(newCompany)

    // Update user's companyId
    const usersCol = await getUsersCollection()
    await usersCol.updateOne(
      { _id: userObjectId },
      { $set: { companyId: newCompany._id, updatedAt: new Date() } }
    )

    return apiSuccess(newCompany, 201)
  } catch (error: any) {
    console.error("POST /api/companies error:", error)
    return apiError("Failed to register company", 500)
  }
}
