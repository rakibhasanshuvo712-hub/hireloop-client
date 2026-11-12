import { ObjectId, Collection } from "mongodb"
import { getDb } from "../mongodb"

export type UserRole = "Seeker" | "Recruiter" | "Admin"
export type UserStatus = "Active" | "Suspended"
export type UserPlan = "Free" | "Pro" | "Premium" | "Growth" | "Enterprise"

export interface UserDoc {
  _id: ObjectId
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role: UserRole
  status: UserStatus
  plan: UserPlan
  companyId?: ObjectId
  resumeUrl?: string
  headline?: string
  bio?: string
  skills?: string[]
  createdAt: Date
  updatedAt: Date
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote"
export type JobCategory = "Design" | "Engineering" | "Product" | "Marketing" | "Operations"
export type JobStatus = "Active" | "Closed" | "Draft"

export interface JobDoc {
  _id: ObjectId
  title: string
  companyId: ObjectId
  companyName: string
  companyLogo: string
  location: string
  type: JobType
  category: JobCategory
  salaryMin: number
  salaryMax: number
  experience: string
  workLevel: string
  deadline: Date
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  status: JobStatus
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export type ApplicationStatus = "Applied" | "Under Review" | "Shortlisted" | "Offered" | "Rejected"

export interface ApplicationDoc {
  _id: ObjectId
  jobId: ObjectId
  seekerId: ObjectId
  companyId: ObjectId
  applicantName: string
  applicantEmail: string
  resumeUrl: string
  coverNote: string
  status: ApplicationStatus
  appliedAt: Date
  updatedAt: Date
}

export type CompanyStatus = "Pending" | "Approved" | "Rejected"

export interface CompanyDoc {
  _id: ObjectId
  name: string
  logo: string
  industry: string
  location: string
  size: string
  website: string
  about: string
  recruiterId: ObjectId
  status: CompanyStatus
  createdAt: Date
}

export interface SavedJobDoc {
  _id: ObjectId
  seekerId: ObjectId
  jobId: ObjectId
  savedAt: Date
}

export type PaymentStatus = "Paid" | "Failed" | "Pending"

export interface PaymentDoc {
  _id: ObjectId
  userId: ObjectId
  userEmail: string
  stripeSessionId: string
  plan: string
  amount: number
  currency: string
  status: PaymentStatus
  createdAt: Date
}

// Database collection accessors
export async function getJobsCollection(): Promise<Collection<JobDoc>> {
  const db = await getDb()
  return db.collection<JobDoc>("jobs")
}

export async function getApplicationsCollection(): Promise<Collection<ApplicationDoc>> {
  const db = await getDb()
  return db.collection<ApplicationDoc>("applications")
}

export async function getCompaniesCollection(): Promise<Collection<CompanyDoc>> {
  const db = await getDb()
  return db.collection<CompanyDoc>("companies")
}

export async function getSavedJobsCollection(): Promise<Collection<SavedJobDoc>> {
  const db = await getDb()
  return db.collection<SavedJobDoc>("saved_jobs")
}

export async function getPaymentsCollection(): Promise<Collection<PaymentDoc>> {
  const db = await getDb()
  return db.collection<PaymentDoc>("payments")
}

export async function getUsersCollection(): Promise<Collection<UserDoc>> {
  const db = await getDb()
  return db.collection<UserDoc>("user")
}
