"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MapPin,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  UploadCloud,
  User,
  X,
  AlertCircle,
} from "lucide-react"

import { initialJobs, initialApplications, initialTransactions, Job, Application } from "@/lib/mock-data"

function SeekerDashboardContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  const [savedJobs, setSavedJobs] = React.useState<Job[]>(initialJobs.slice(0, 4))
  const [applications, setApplications] = React.useState<Application[]>(initialApplications)
  const [profileName, setProfileName] = React.useState("Alex Rivera")
  const [profileEmail, setProfileEmail] = React.useState("alex.rivera@example.com")
  const [profileHeadline, setProfileHeadline] = React.useState("Senior Product Designer & Frontend Architect")
  const [profileBio, setProfileBio] = React.useState("Passionate about crafting intuitive user experiences and design systems for enterprise-grade SaaS products. 6+ years in modern web development.")
  const [skills, setSkills] = React.useState<string[]>([
    "Figma",
    "Design Systems",
    "React 19",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ])
  const [newSkillInput, setNewSkillInput] = React.useState("")
  const [resumeUploaded, setResumeUploaded] = React.useState(true)
  const [saveToast, setSaveToast] = React.useState(false)

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(newSkillInput.trim())) {
        setSkills([...skills, newSkillInput.trim()])
      }
      setNewSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const removeSavedJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== jobId))
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3000)
  }

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "Applied":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Under Review":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "Shortlisted":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "Offered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0f172a] px-5 py-4 text-white shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <span className="text-sm font-medium">Profile successfully updated!</span>
        </div>
      )}

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back, {profileName.split(" ")[0]} 👋
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Here is what is happening with your job search and active applications today.
            </p>
          </div>

          {/* Stats Cards Row (Matching Screenshot 1) */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Saved Jobs</span>
                <Bookmark className="size-4 text-indigo-400" />
              </div>
              <div className="mt-3 text-3xl font-extrabold text-white">{savedJobs.length}</div>
              <p className="mt-1 text-[11px] text-zinc-500">Ready to apply</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Submitted</span>
                <Briefcase className="size-4 text-cyan-400" />
              </div>
              <div className="mt-3 text-3xl font-extrabold text-white">{applications.length}</div>
              <p className="mt-1 text-[11px] text-zinc-500">Across 5 companies</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Interviews</span>
                <Calendar className="size-4 text-amber-400" />
              </div>
              <div className="mt-3 text-3xl font-extrabold text-white">4</div>
              <p className="mt-1 text-[11px] text-amber-400 font-medium">1 scheduled this week</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Offers Received</span>
                <Sparkles className="size-4 text-emerald-400" />
              </div>
              <div className="mt-3 text-3xl font-extrabold text-white">1</div>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">Google DeepMind</p>
            </div>
          </div>

          {/* Profile Card & Application Status Distribution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* User Profile Summary */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 lg:col-span-1 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/30 text-xl font-bold text-indigo-300 border border-indigo-500/30">
                  {profileName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{profileName}</h3>
                  <p className="text-xs text-zinc-400">{profileEmail}</p>
                  <span className="mt-1 inline-block rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                    Pro Seeker Tier
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.06] pt-4 text-xs">
                <p className="font-semibold text-zinc-300">{profileHeadline}</p>
                <p className="mt-2 text-zinc-400 leading-relaxed line-clamp-3">{profileBio}</p>
              </div>

              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <Link
                  href="/dashboard/seeker?tab=settings"
                  className="block w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Edit Full Profile
                </Link>
              </div>
            </div>

            {/* Application Funnel Progress */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 lg:col-span-2 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">Application Pipeline</h3>
              <p className="text-xs text-zinc-400">Distribution of your active submissions</p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300">
                    <span>Applied & Pending Initial Review (1)</span>
                    <span className="text-blue-400">20%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-white/5">
                    <div className="h-full w-[20%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300">
                    <span>Under Review by Recruiter (1)</span>
                    <span className="text-amber-400">20%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-white/5">
                    <div className="h-full w-[20%] rounded-full bg-amber-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300">
                    <span>Shortlisted for Interview (1)</span>
                    <span className="text-purple-400">20%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-white/5">
                    <div className="h-full w-[20%] rounded-full bg-purple-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-300">
                    <span>Offer Extended (1)</span>
                    <span className="text-emerald-400">20%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-white/5">
                    <div className="h-full w-[20%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl">
            <h3 className="text-base font-bold text-white">Recent Activity</h3>
            <div className="mt-4 divide-y divide-white/[0.06]">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-300">
                    <strong>Google DeepMind</strong> moved your application to <strong>Offered</strong>
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-purple-400" />
                  <span className="text-xs text-zinc-300">
                    <strong>Apple</strong> scheduled a technical interview for <strong>Lead Frontend Engineer</strong>
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">3 days ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-blue-400" />
                  <span className="text-xs text-zinc-300">
                    You submitted an application for <strong>Senior Product Designer</strong> at <strong>Airbnb</strong>
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">5 days ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Jobs Tab */}
      {activeTab === "saved" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Saved Jobs</h1>
              <p className="mt-1 text-sm text-zinc-400">Opportunities you have bookmarked to review or apply.</p>
            </div>
            <Link
              href="/jobs"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
            >
              Browse More Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#161a2b] p-2.5">
                    <Image src={job.logo} alt={job.company} width={36} height={36} className="size-8 object-contain" />
                  </div>
                  <div>
                    <Link href={`/jobs/${job.id}`} className="text-base font-semibold text-white hover:text-indigo-400">
                      {job.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="text-indigo-300 font-medium">{job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => removeSavedJob(job.id)}
                    className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Applications Tab */}
      {activeTab === "applications" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">My Applications</h1>
            <p className="mt-1 text-sm text-zinc-400">Track and monitor all your submitted applications.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Role & Company</th>
                    <th className="px-6 py-4">Applied Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#141829] p-2">
                            <Image src={app.companyLogo} alt={app.company} width={24} height={24} className="size-5 object-contain" />
                          </div>
                          <div>
                            <span className="font-semibold text-white">{app.jobTitle}</span>
                            <p className="text-[11px] text-zinc-400">{app.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/jobs/${app.jobId}`}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
                        >
                          View Listing
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subscription & Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-8 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Subscription & Billing</h1>
            <p className="mt-1 text-sm text-zinc-400">Manage your seeker plan, usage allowances, and invoices.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Current Plan Card */}
            <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#121528] to-[#0c0e18] p-6 lg:col-span-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                    Active Subscription
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">Seeker Pro Tier</h3>
                  <p className="text-xs text-zinc-400 mt-1">$19.00 / month · Renews next cycle on Dec 10, 2026</p>
                </div>
                <Link
                  href="/pricing"
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md"
                >
                  Change Plan
                </Link>
              </div>

              {/* Monthly Application Usage */}
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300">Monthly Applications Used</span>
                  <span className="text-indigo-400">18 / 30 Applications</span>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
                <p className="mt-2 text-[11px] text-zinc-500">12 applications remaining until renewal.</p>
              </div>
            </div>

            {/* Payment Method Graphic Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Payment Method
                </span>
                <div className="mt-4 rounded-2xl bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-900 p-4 border border-white/10 text-white shadow-inner">
                  <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                    <span>Stripe Verified</span>
                    <CreditCard className="size-4 text-white" />
                  </div>
                  <div className="my-4 font-mono text-base tracking-widest text-zinc-200">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>EXP: 12/28</span>
                    <span>ALEX RIVERA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("Billing method edit dialog")}
                className="mt-4 rounded-xl border border-white/10 bg-white/5 py-2 text-center text-xs font-medium text-zinc-300 hover:text-white"
              >
                Update Card
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl">
            <h3 className="text-base font-bold text-white">Payment & Billing History</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3">Invoice Date</th>
                    <th className="py-3">Description</th>
                    <th className="py-3">Amount</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {initialTransactions.slice(0, 2).map((tx) => (
                    <tr key={tx.id} className="text-zinc-300">
                      <td className="py-3">{tx.date}</td>
                      <td className="py-3 font-medium text-white">{tx.plan}</td>
                      <td className="py-3">${tx.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => alert("Downloading PDF invoice...")}
                          className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                        >
                          <Download className="size-3.5" /> PDF
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

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <form onSubmit={handleProfileSave} className="space-y-8 max-w-4xl animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Profile & Resume Settings</h1>
            <p className="mt-1 text-sm text-zinc-400">Keep your professional credentials updated to stand out to hiring managers.</p>
          </div>

          {/* Personal Information */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-zinc-400">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">Professional Headline</label>
                <input
                  type="text"
                  value={profileHeadline}
                  onChange={(e) => setProfileHeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-zinc-400">Bio & Summary</label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Skills Management */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Skills & Proficiencies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white">
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-3 flex max-w-sm items-center gap-2">
              <input
                type="text"
                placeholder="Type skill and press Enter (e.g. GraphQL)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Resume Upload Dropzone */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Resume Document</h3>
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.01] p-8 text-center transition-colors hover:border-indigo-500/50">
              <UploadCloud className="size-10 text-indigo-400" />
              <p className="mt-3 text-sm font-semibold text-white">
                Drag and drop your latest CV/Resume (PDF)
              </p>
              <p className="text-xs text-zinc-500 mt-1">Maximum file size: 10MB</p>

              {resumeUploaded && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300 border border-indigo-500/20">
                  <FileText className="size-4" /> Alex_Rivera_Product_Resume_2026.pdf
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-indigo-600 px-8 py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function SeekerDashboardPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-sm text-zinc-400">Loading seeker dashboard...</div>}>
      <SeekerDashboardContent />
    </React.Suspense>
  )
}

