"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Briefcase,
  Users,
  CheckCircle2,
  PlusCircle,
  Building,
  CreditCard,
  FileText,
  DollarSign,
  MapPin,
  Calendar,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react"

import { initialJobs, initialApplications, initialCompanies, Job, Application } from "@/lib/mock-data"

function RecruiterDashboardContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  const [jobs, setJobs] = React.useState<Job[]>(initialJobs.slice(0, 5))
  const [applicants, setApplicants] = React.useState<Application[]>(initialApplications)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  // New Job Form State
  const [newTitle, setNewTitle] = React.useState("")
  const [newCategory, setNewCategory] = React.useState<Job["category"]>("Engineering")
  const [newType, setNewType] = React.useState<Job["type"]>("Full-time")
  const [newSalaryMin, setNewSalaryMin] = React.useState("130000")
  const [newSalaryMax, setNewSalaryMax] = React.useState("170000")
  const [newLocation, setNewLocation] = React.useState("San Francisco, CA")
  const [newDeadline, setNewDeadline] = React.useState("Jan 31, 2027")
  const [newDescription, setNewDescription] = React.useState("")
  const [newResponsibilities, setNewResponsibilities] = React.useState("")
  const [newRequirements, setNewRequirements] = React.useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()
    const created: Job = {
      id: `job-${Date.now()}`,
      title: newTitle || "Senior Software Engineer",
      company: "Airbnb",
      logo: "/logos/airbnb.png",
      location: newLocation,
      type: newType,
      category: newCategory,
      salary: `$${Math.round(parseInt(newSalaryMin) / 1000)}k - $${Math.round(parseInt(newSalaryMax) / 1000)}k`,
      salaryMin: parseInt(newSalaryMin),
      salaryMax: parseInt(newSalaryMax),
      featured: true,
      postedAt: "Just now",
      experience: "4+ years",
      workLevel: "Senior Level",
      deadline: newDeadline,
      description: newDescription || "Exciting opportunity to build core services.",
      responsibilities: newResponsibilities ? newResponsibilities.split("\n") : ["Build scalable services"],
      requirements: newRequirements ? newRequirements.split("\n") : ["Experience with Next.js & Node.js"],
      benefits: ["Health & Dental", "401(k) Match", "Remote Stipend"],
      companyOverview: {
        about: "Leading global hospitality platform.",
        industry: "Travel Tech",
        size: "6,000+",
        website: "https://airbnb.com",
        location: "San Francisco, CA",
      },
    }

    setJobs([created, ...jobs])
    setNewTitle("")
    setNewDescription("")
    setNewResponsibilities("")
    setNewRequirements("")
    showToast("New Job Successfully Published!")
  }

  const updateApplicantStatus = (appId: string, newStatus: Application["status"]) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    )
    showToast(`Status updated to ${newStatus}`)
  }

  const toggleJobStatus = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
    showToast("Job post closed and archived.")
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-indigo-500/30 bg-[#0f172a] px-5 py-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="size-5 text-indigo-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Recruiter Overview (Matching Screenshot 2) */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Recruiter Command Center
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Airbnb Hiring Portal · Active Plan: <strong>Growth (5 / 10 jobs used)</strong>
              </p>
            </div>
            <Link
              href="/dashboard/recruiter?tab=post-job"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
            >
              <PlusCircle className="size-4" /> Post a New Job
            </Link>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Posts</span>
              <div className="mt-3 text-3xl font-extrabold text-white">8</div>
              <p className="mt-1 text-[11px] text-zinc-500">All-time listings</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Applicants</span>
              <div className="mt-3 text-3xl font-extrabold text-white">142</div>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">+18 this week</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Jobs</span>
              <div className="mt-3 text-3xl font-extrabold text-indigo-400">{jobs.length}</div>
              <p className="mt-1 text-[11px] text-zinc-500">5 available slots</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Jobs Closed</span>
              <div className="mt-3 text-3xl font-extrabold text-white">3</div>
              <p className="mt-1 text-[11px] text-zinc-500">Successfully hired</p>
            </div>
          </div>

          {/* Recent Candidates Quick Review Table */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white">Latest Candidate Submissions</h3>
                <p className="text-xs text-zinc-400">Review applicants and advance them in your recruitment funnel.</p>
              </div>
              <Link
                href="/dashboard/recruiter?tab=applicants"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                View All Applicants ({applicants.length})
              </Link>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead className="text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3">Candidate</th>
                    <th className="py-3">Target Role</th>
                    <th className="py-3">Applied</th>
                    <th className="py-3">Current Status</th>
                    <th className="py-3 text-right">Update Funnel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {applicants.map((app) => (
                    <tr key={app.id} className="text-zinc-300">
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-indigo-500/20 font-bold text-indigo-300">
                            {app.applicantName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-white">{app.applicantName}</span>
                            <p className="text-[11px] text-zinc-500">{app.applicantEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-medium text-white">{app.jobTitle}</td>
                      <td className="py-3.5 text-zinc-400">{app.appliedDate}</td>
                      <td className="py-3.5">
                        <span className="inline-block rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/20">
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicantStatus(app.id, e.target.value as Application["status"])}
                          aria-label={`Update status for applicant ${app.applicantName}`}
                          className="rounded-lg border border-white/10 bg-[#121528] px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Post a New Job Tab (Matching Screenshot 2) */}
      {activeTab === "post-job" && (
        <form onSubmit={handleCreateJob} className="space-y-8 max-w-4xl animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Post a New Job</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Publish an open position across the HireLoop network. Active jobs used: <strong>5 / 10</strong>
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/[0.06] pb-4">
              Role & Compensation
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Product Designer, Lead Frontend Engineer"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Job["category"])}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#121528] px-4 py-3 text-sm text-white outline-none cursor-pointer"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Job Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as Job["type"])}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#121528] px-4 py-3 text-sm text-white outline-none cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Minimum Salary (USD/yr)
                </label>
                <input
                  type="number"
                  value={newSalaryMin}
                  onChange={(e) => setNewSalaryMin(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Maximum Salary (USD/yr)
                </label>
                <input
                  type="number"
                  value={newSalaryMax}
                  onChange={(e) => setNewSalaryMax(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Location (City or Remote)
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Application Deadline
                </label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-base font-bold text-white border-b border-white/[0.06] pb-4 pt-4">
              Job Description & Responsibilities
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Overview Summary
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline the mission of this role and team..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Key Responsibilities (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={newResponsibilities}
                  onChange={(e) => setNewResponsibilities(e.target.value)}
                  placeholder="Lead core frontend architecture&#10;Partner with product managers&#10;Drive design system adoption"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Requirements & Qualifications (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={newRequirements}
                  onChange={(e) => setNewRequirements(e.target.value)}
                  placeholder="5+ years production experience&#10;Proficiency in React 19 and Next.js&#10;Strong communication skills"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-white/[0.06] pt-6">
              <button
                type="button"
                onClick={() => setNewTitle("")}
                className="px-5 py-3 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-8 py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all"
              >
                Publish Job Listing
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Manage Job Posts Tab */}
      {activeTab === "jobs" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Manage Job Posts</h1>
              <p className="mt-1 text-sm text-zinc-400">Monitor active listings, edit roles, or archive filled vacancies.</p>
            </div>
            <Link
              href="/dashboard/recruiter?tab=post-job"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
            >
              + Create Post
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Job Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Applicants</th>
                    <th className="px-6 py-4">Posted Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">
                        <Link href={`/jobs/${job.id}`} className="hover:text-indigo-400">
                          {job.title}
                        </Link>
                        <p className="text-[11px] text-zinc-500">{job.location}</p>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{job.category}</td>
                      <td className="px-6 py-4 font-semibold text-indigo-400">
                        {Math.floor(Math.random() * 25) + 8} Candidates
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{job.postedAt}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => toggleJobStatus(job.id)}
                          className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/20"
                        >
                          Close Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Applicants Tab */}
      {activeTab === "applicants" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Candidate Applicants</h1>
            <p className="mt-1 text-sm text-zinc-400">Screen resumes, change stage, and communicate with talent.</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Candidate Profile</th>
                    <th className="px-6 py-4">Position</th>
                    <th className="px-6 py-4">Date Applied</th>
                    <th className="px-6 py-4">Resume</th>
                    <th className="px-6 py-4">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600/30 font-bold text-indigo-300">
                            {app.applicantName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-white">{app.applicantName}</span>
                            <p className="text-[11px] text-zinc-500">{app.applicantEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{app.jobTitle}</td>
                      <td className="px-6 py-4 text-zinc-400">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => alert(`Opening resume for ${app.applicantName}`)}
                          className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          <FileText className="size-3.5" /> View PDF
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicantStatus(app.id, e.target.value as Application["status"])}
                          aria-label={`Change stage for applicant ${app.applicantName}`}
                          className="rounded-lg border border-white/10 bg-[#121528] px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Company Profile Tab */}
      {activeTab === "company" && (
        <div className="space-y-6 max-w-4xl animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Company Profile</h1>
            <p className="mt-1 text-sm text-zinc-400">Public company page information seen by candidates.</p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
              <div className="flex items-center gap-4">
                <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-[#161a2b] p-3">
                  <Image src="/logos/airbnb.png" alt="Airbnb" width={40} height={40} className="size-10 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Airbnb</h3>
                  <p className="text-xs text-zinc-400">recruiter@airbnb.com</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="size-4" /> Admin Verified
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label className="font-semibold text-zinc-400 uppercase tracking-wider">Industry</label>
                <input
                  type="text"
                  defaultValue="Travel & Hospitality Tech"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-400 uppercase tracking-wider">Website URL</label>
                <input
                  type="text"
                  defaultValue="https://airbnb.com"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-400 uppercase tracking-wider">Headquarters</label>
                <input
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-400 uppercase tracking-wider">Company Size</label>
                <input
                  type="text"
                  defaultValue="6,000+ employees"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-semibold text-zinc-400 uppercase tracking-wider">Company Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Airbnb is a global community marketplace that connects hosts offering unique stays and experiences with travelers around the world."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => showToast("Company settings saved.")}
                className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
              >
                Save Company Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6 animate-in fade-in max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Hiring Plan & Invoices</h1>
            <p className="mt-1 text-sm text-zinc-400">Scale your team with higher active posting limits and team seats.</p>
          </div>

          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#121528] to-[#0c0e18] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                  Growth Hiring Tier
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white">$49.00 / month</h3>
                <p className="text-xs text-zinc-400 mt-1">Allows up to 10 active concurrent job posts.</p>
              </div>
              <Link
                href="/pricing"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Upgrade to Enterprise ($149)
              </Link>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Active Job Post Usage</span>
                <span className="text-indigo-400">5 / 10 Jobs Active</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RecruiterDashboardPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-sm text-zinc-400">Loading recruiter dashboard...</div>}>
      <RecruiterDashboardContent />
    </React.Suspense>
  )
}

