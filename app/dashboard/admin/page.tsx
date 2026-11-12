"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Users,
  Building,
  Briefcase,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  UserX,
  Sparkles,
} from "lucide-react"

import {
  initialUsers,
  initialCompanies,
  initialJobs,
  initialTransactions,
  PlatformUser,
  Company,
  Job,
  PaymentTransaction,
} from "@/lib/mock-data"

function AdminDashboardContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  const [users, setUsers] = React.useState<PlatformUser[]>(initialUsers)
  const [companies, setCompanies] = React.useState<Company[]>(initialCompanies)
  const [jobs, setJobs] = React.useState<Job[]>(initialJobs)
  const [transactions] = React.useState<PaymentTransaction[]>(initialTransactions)

  const [userSearch, setUserSearch] = React.useState("")
  const [userRoleFilter, setUserRoleFilter] = React.useState("All")
  const [toastMsg, setToastMsg] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // User Actions
  const toggleUserRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === "Seeker" ? "Recruiter" : "Seeker"
          triggerToast(`Updated ${u.name}'s role to ${newRole}`)
          return { ...u, role: newRole }
        }
        return u
      })
    )
  }

  const toggleUserSuspension = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === "Active" ? "Suspended" : "Active"
          triggerToast(`Account status set to ${newStatus} for ${u.name}`)
          return { ...u, status: newStatus }
        }
        return u
      })
    )
  }

  // Company Actions
  const setCompanyStatus = (companyId: string, status: "Approved" | "Rejected") => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status } : c))
    )
    triggerToast(`Company marked as ${status}`)
  }

  // Job Actions
  const removeJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
    triggerToast("Job listing removed by administrator.")
  }

  const filteredUsers = users.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchesRole = userRoleFilter === "All" || u.role === userRoleFilter
    return matchesQuery && matchesRole
  })

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-indigo-500/30 bg-[#0f172a] px-5 py-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="size-5 text-indigo-400" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Admin Overview (Matching Screenshot 3) */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Platform Governance & Analytics
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              System-wide metrics across talent seekers, verified employers, job health, and platform MRR.
            </p>
          </div>

          {/* 5 Stats Row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Users</span>
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">18,420</div>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">+12% vs last month</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Recruiters</span>
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">1,240</div>
              <p className="mt-1 text-[11px] text-zinc-500">Active hiring seats</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Companies</span>
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{companies.length}</div>
              <p className="mt-1 text-[11px] text-amber-400 font-medium">1 awaiting verification</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Jobs</span>
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">4,120</div>
              <p className="mt-1 text-[11px] text-indigo-400 font-medium">Global positions</p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-indigo-500/30 bg-gradient-to-tr from-indigo-950/60 to-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Platform Revenue</span>
              <div className="mt-2 text-2xl font-extrabold text-indigo-300 sm:text-3xl">$124.5K</div>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">+24% revenue gain</p>
            </div>
          </div>

          {/* Recent Platform Transactions Table */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white">Recent Platform Transactions</h3>
                <p className="text-xs text-zinc-400">Subscription upgrades across Seekers and Recruiters.</p>
              </div>
              <Link
                href="/dashboard/admin?tab=payments"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                View Full Audit Log
              </Link>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead className="text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3">Subscriber</th>
                    <th className="py-3">Tier Plan</th>
                    <th className="py-3">Amount</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="text-zinc-300">
                      <td className="py-3 font-medium text-white">{tx.userName}</td>
                      <td className="py-3 text-zinc-400">{tx.plan}</td>
                      <td className="py-3 font-semibold text-emerald-400">${tx.amount.toFixed(2)}</td>
                      <td className="py-3 text-zinc-500">{tx.date}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Manage Users Tab (Matching Screenshot 3) */}
      {activeTab === "users" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Manage Platform Users</h1>
            <p className="mt-1 text-sm text-zinc-400">Search, alter roles, and manage account statuses.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-[#0c0e18] px-3.5 py-2">
              <Search className="size-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by name or email..."
                className="ml-2.5 w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
              />
            </div>

            <select
              value={userRoleFilter}
              onChange={(e) => setUserRoleFilter(e.target.value)}
              aria-label="Filter users by role"
              className="rounded-xl border border-white/10 bg-[#0c0e18] px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Seeker">Seekers Only</option>
              <option value="Recruiter">Recruiters Only</option>
              <option value="Admin">Admins Only</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined Date</th>
                    <th className="px-6 py-4">Account Status</th>
                    <th className="px-6 py-4 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-indigo-600/30 font-bold text-indigo-300">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-white">{u.name}</span>
                            <p className="text-[11px] text-zinc-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          u.role === "Admin"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : u.role === "Recruiter"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{u.joinDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          u.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {u.role !== "Admin" && (
                          <button
                            onClick={() => toggleUserRole(u.id)}
                            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
                          >
                            Make {u.role === "Seeker" ? "Recruiter" : "Seeker"}
                          </button>
                        )}
                        <button
                          onClick={() => toggleUserSuspension(u.id)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                            u.status === "Active"
                              ? "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {u.status === "Active" ? "Suspend" : "Activate"}
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

      {/* Company Verification Tab (Matching Screenshot 3) */}
      {activeTab === "companies" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Company Verifications</h1>
            <p className="mt-1 text-sm text-zinc-400">Review company submissions before allowing recruiters to publish public listings.</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Recruiter Contact</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4">Approval Status</th>
                    <th className="px-6 py-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {companies.map((comp) => (
                    <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#161a2b] p-1.5">
                            <Image src={comp.logo} alt={comp.name} width={24} height={24} className="size-6 object-contain" />
                          </div>
                          <div>
                            <span className="font-semibold text-white">{comp.name}</span>
                            <p className="text-[11px] text-zinc-500">{comp.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{comp.recruiterEmail}</td>
                      <td className="px-6 py-4 text-zinc-400">{comp.industry}</td>
                      <td className="px-6 py-4 text-zinc-500">{comp.dateSubmitted}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          comp.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : comp.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          {comp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {comp.status !== "Approved" && (
                          <button
                            onClick={() => setCompanyStatus(comp.id, "Approved")}
                            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
                          >
                            Approve
                          </button>
                        )}
                        {comp.status !== "Rejected" && (
                          <button
                            onClick={() => setCompanyStatus(comp.id, "Rejected")}
                            className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-500/20"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Job Moderation Tab */}
      {activeTab === "jobs" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Job Moderation</h1>
            <p className="mt-1 text-sm text-zinc-400">Review all listings to ensure compliance with marketplace guidelines.</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Title & Company</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{job.title}</span>
                        <p className="text-[11px] text-zinc-500">{job.company}</p>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{job.category}</td>
                      <td className="px-6 py-4 text-zinc-400">{job.type}</td>
                      <td className="px-6 py-4 font-semibold text-indigo-400">{job.salary}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
                        >
                          Inspect
                        </Link>
                        <button
                          onClick={() => removeJob(job.id)}
                          className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/20"
                        >
                          Remove
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

      {/* Payments & Revenue Tab */}
      {activeTab === "payments" && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Payment & Subscription Logs</h1>
            <p className="mt-1 text-sm text-zinc-400">Complete audit trail of Stripe subscription charges.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Gross Volume</span>
              <div className="mt-2 text-3xl font-extrabold text-white">$124,500</div>
              <p className="mt-1 text-[11px] text-zinc-500">Processed through Stripe</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Monthly MRR</span>
              <div className="mt-2 text-3xl font-extrabold text-emerald-400">$14,800</div>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">+15.4% growth</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e18] p-5 shadow-lg">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Subs</span>
              <div className="mt-2 text-3xl font-extrabold text-indigo-400">740</div>
              <p className="mt-1 text-[11px] text-zinc-500">520 Seekers, 220 Recruiters</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Subscription Plan</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-mono text-zinc-400">{tx.id}</td>
                      <td className="px-6 py-4 font-medium text-white">{tx.userName}</td>
                      <td className="px-6 py-4 text-zinc-300">{tx.plan}</td>
                      <td className="px-6 py-4 font-semibold text-emerald-400">${tx.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-zinc-400">{tx.paymentMethod}</td>
                      <td className="px-6 py-4 text-zinc-500">{tx.date}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-sm text-zinc-400">Loading admin workspace...</div>}>
      <AdminDashboardContent />
    </React.Suspense>
  )
}

