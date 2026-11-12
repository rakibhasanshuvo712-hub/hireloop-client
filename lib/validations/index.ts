import { z } from "zod"

export const jobTypeEnum = z.enum(["Full-time", "Part-time", "Contract", "Remote"])
export const jobCategoryEnum = z.enum(["Design", "Engineering", "Product", "Marketing", "Operations"])
export const jobStatusEnum = z.enum(["Active", "Closed", "Draft"])

export const jobCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  companyId: z.string().optional(),
  companyName: z.string().optional(),
  companyLogo: z.string().optional(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: jobTypeEnum,
  category: jobCategoryEnum,
  salaryMin: z.coerce.number().min(0, "Salary min must be positive"),
  salaryMax: z.coerce.number().min(0, "Salary max must be positive"),
  experience: z.string().min(1, "Experience is required"),
  workLevel: z.string().min(1, "Work level is required"),
  deadline: z.string().or(z.date()).transform((val) => new Date(val)),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  status: jobStatusEnum.default("Active"),
  featured: z.boolean().default(false),
})

export const jobUpdateSchema = jobCreateSchema.partial().extend({
  status: jobStatusEnum.optional(),
})

export const applicationCreateSchema = z.object({
  jobId: z.string().min(1, "jobId is required"),
  applicantName: z.string().min(2, "Applicant name is required"),
  applicantEmail: z.string().email("Invalid email address"),
  resumeUrl: z.string().min(1, "Resume URL is required"),
  coverNote: z.string().default(""),
})

export const applicationStatusUpdateSchema = z.object({
  status: z.enum(["Applied", "Under Review", "Shortlisted", "Offered", "Rejected"]),
})

export const companyCreateSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  logo: z.string().default("/logos/placeholder.png"),
  industry: z.string().min(2, "Industry is required"),
  location: z.string().min(2, "Location is required"),
  size: z.string().min(1, "Size is required"),
  website: z.string().default(""),
  about: z.string().min(10, "About section must be at least 10 characters"),
})

export const adminCompanyStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
})

export const adminUserUpdateSchema = z.object({
  role: z.enum(["Seeker", "Recruiter", "Admin"]).optional(),
  status: z.enum(["Active", "Suspended"]).optional(),
})

export const checkoutSchema = z.object({
  plan: z.enum(["Pro", "Premium", "Growth", "Enterprise"]),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  testPayment: z.boolean().optional(),
})
