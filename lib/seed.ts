import { ObjectId } from "mongodb"
import { getDb } from "./mongodb"
import { initialCompanies, initialJobs } from "./mock-data"
import { CompanyDoc, JobDoc, JobCategory, JobType } from "./types/database"

export async function seedDatabase(force: boolean = false) {
  const db = await getDb()
  const companiesCol = db.collection<CompanyDoc>("companies")
  const jobsCol = db.collection<JobDoc>("jobs")

  const existingCompCount = await companiesCol.countDocuments()
  if (existingCompCount > 0 && !force) {
    return {
      message: "Database already has data. Pass force=true to re-seed.",
      companies: existingCompCount,
      jobs: await jobsCol.countDocuments(),
    }
  }

  if (force) {
    await companiesCol.deleteMany({})
    await jobsCol.deleteMany({})
  }

  // 1. Seed companies
  const companyMap = new Map<string, ObjectId>()
  const companyDocs: CompanyDoc[] = []

  for (const c of initialCompanies) {
    const compId = new ObjectId()
    companyMap.set(c.name.toLowerCase(), compId)

    companyDocs.push({
      _id: compId,
      name: c.name,
      logo: c.logo || "/logos/placeholder.png",
      industry: c.industry,
      location: c.location,
      size: c.size,
      website: c.website || `https://${c.name.toLowerCase().replace(/\s+/g, "")}.com`,
      about: c.about,
      recruiterId: new ObjectId(),
      status: (c.status as any) || "Approved",
      createdAt: new Date(c.dateSubmitted || Date.now()),
    })
  }

  if (companyDocs.length > 0) {
    await companiesCol.insertMany(companyDocs)
  }

  // 2. Seed jobs
  const jobDocs: JobDoc[] = []

  for (const j of initialJobs) {
    const compNameKey = j.company.toLowerCase()
    let companyId = companyMap.get(compNameKey)

    if (!companyId) {
      // Find or create company
      const found = companyDocs.find((c) => c.name.toLowerCase() === compNameKey)
      if (found) {
        companyId = found._id
      } else {
        companyId = new ObjectId()
        const newComp: CompanyDoc = {
          _id: companyId,
          name: j.company,
          logo: j.logo || "/logos/placeholder.png",
          industry: j.companyOverview?.industry || "Technology",
          location: j.companyOverview?.location || j.location,
          size: j.companyOverview?.size || "1,000+",
          website: j.companyOverview?.website || "https://example.com",
          about: j.companyOverview?.about || `${j.company} is an innovative tech organization.`,
          recruiterId: new ObjectId(),
          status: "Approved",
          createdAt: new Date(),
        }
        await companiesCol.insertOne(newComp)
        companyMap.set(compNameKey, companyId)
      }
    }

    jobDocs.push({
      _id: new ObjectId(),
      title: j.title,
      companyId: companyId,
      companyName: j.company,
      companyLogo: j.logo || "/logos/placeholder.png",
      location: j.location,
      type: j.type as JobType,
      category: j.category as JobCategory,
      salaryMin: j.salaryMin || 80000,
      salaryMax: j.salaryMax || 150000,
      experience: j.experience || "3+ years",
      workLevel: j.workLevel || "Mid-Senior Level",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days in future
      description: j.description,
      responsibilities: j.responsibilities || [],
      requirements: j.requirements || [],
      benefits: j.benefits || [],
      status: "Active",
      featured: !!j.featured,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  if (jobDocs.length > 0) {
    await jobsCol.insertMany(jobDocs)
  }

  return {
    message: "Database seeded successfully",
    companies: companyDocs.length,
    jobs: jobDocs.length,
  }
}
