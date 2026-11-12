import { NextRequest } from "next/server"
import {
  getUsersCollection,
  getJobsCollection,
  getCompaniesCollection,
  getApplicationsCollection,
  getPaymentsCollection,
} from "@/lib/types/database"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"

const PLAN_MONTHLY_RATES: Record<string, number> = {
  Free: 0,
  Pro: 19,
  Premium: 39,
  Growth: 49,
  Enterprise: 149,
}

export async function GET(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    if (user.role !== "Admin") {
      return apiError("Access denied. Admin privileges required.", 403)
    }

    const [usersCol, jobsCol, companiesCol, appsCol, paymentsCol] = await Promise.all([
      getUsersCollection(),
      getJobsCollection(),
      getCompaniesCollection(),
      getApplicationsCollection(),
      getPaymentsCollection(),
    ])

    const [
      totalUsers,
      recruitersCount,
      seekersCount,
      totalJobs,
      activeJobs,
      applicationsCount,
      totalCompanies,
      pendingCompanies,
      usersByPlan,
      revenueResult,
    ] = await Promise.all([
      usersCol.countDocuments(),
      usersCol.countDocuments({ role: "Recruiter" }),
      usersCol.countDocuments({ role: "Seeker" }),
      jobsCol.countDocuments(),
      jobsCol.countDocuments({ status: "Active" }),
      appsCol.countDocuments(),
      companiesCol.countDocuments(),
      companiesCol.countDocuments({ status: "Pending" }),
      usersCol
        .aggregate<{ _id: string; count: number }>([
          { $match: { status: "Active", plan: { $exists: true, $ne: "Free" } } },
          { $group: { _id: "$plan", count: { $sum: 1 } } },
        ])
        .toArray(),
      paymentsCol
        .aggregate<{ _id: null; total: number }>([
          { $match: { status: "Paid" } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray(),
    ])

    // Calculate Platform MRR
    let platformMRR = 0
    const planBreakdown: Record<string, number> = {}

    for (const item of usersByPlan) {
      const planName = item._id
      const count = item.count
      const rate = PLAN_MONTHLY_RATES[planName] || 0
      platformMRR += rate * count
      planBreakdown[planName] = count
    }

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

    return apiSuccess({
      totalUsers,
      recruitersCount,
      seekersCount,
      totalJobs,
      activeJobs,
      applicationsCount,
      totalCompanies,
      pendingCompanies,
      platformMRR,
      totalRevenue,
      planBreakdown,
    })
  } catch (error: any) {
    console.error("GET /api/admin/metrics error:", error)
    return apiError("Failed to fetch admin metrics", 500)
  }
}
