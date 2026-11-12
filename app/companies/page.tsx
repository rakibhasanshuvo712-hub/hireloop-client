"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  MapPin,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"

import { initialCompanies, Company } from "@/lib/mock-data"

export default function CompaniesPage() {
  const [companies] = React.useState<Company[]>(initialCompanies)
  const [selectedIndustry, setSelectedIndustry] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")

  const industries = [
    "All",
    "Travel Tech",
    "Consumer Tech",
    "AI & Search",
    "Entertainment",
    "Cloud & E-Commerce",
    "Audio & Streaming",
    "Automotive & Energy",
  ]

  const filtered = companies.filter((comp) => {
    const matchesIndustry =
      selectedIndustry === "All" || comp.industry.toLowerCase().includes(selectedIndustry.toLowerCase())
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.about.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesIndustry && matchesSearch && comp.status === "Approved"
  })

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="size-3.5" /> 500+ Verified Hiring Partners
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Meet the World&apos;s Leading Employers
          </h1>
          <p className="mt-3 text-base text-zinc-400 max-w-2xl mx-auto">
            Explore company culture, tech stacks, open positions, and work environments from companies shaping modern technology.
          </p>

          {/* Search bar */}
          <div className="mt-8 mx-auto flex max-w-md items-center rounded-2xl border border-white/10 bg-[#0c0e18] px-4 py-2.5 shadow-xl">
            <Search className="size-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or keyword..."
              className="ml-3 w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
          </div>

          {/* Industry tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedIndustry === ind
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0e18]/80 p-6 transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#101322] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#161a2b] p-2.5">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={36}
                      height={36}
                      className="size-8 object-contain"
                    />
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs font-medium text-indigo-300">{company.industry}</p>

                <p className="mt-3 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {company.about}
                </p>

                <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-zinc-500" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-3.5 text-zinc-500" />
                    <span>{company.size} employees</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="text-xs font-semibold text-emerald-400">
                  {company.openJobsCount} Open Jobs
                </span>
                <Link
                  href={`/jobs`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  View Roles <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recruiter Register Company Banner */}
        <div className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-purple-950/30 to-indigo-950/60 p-8 sm:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Hiring Top Tier Talent?</h2>
          <p className="mt-2 text-sm text-zinc-300 max-w-xl mx-auto">
            Create your company profile, post jobs, and gain access to thousands of verified candidates today.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/dashboard/recruiter?tab=company"
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all"
            >
              Register Your Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
