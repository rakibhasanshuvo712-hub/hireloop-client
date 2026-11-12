"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Globe,
  Building2,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Bookmark,
  CheckCircle2,
} from "lucide-react"

import globeImg from "@/app/assets/globe.png"
import { initialJobs, initialCompanies } from "@/lib/mock-data"

const navChips = ["Trending jobs", "Design Systems", "AI Engineering", "Product Leadership", "Remote Only"]

const stats = [
  { value: "50,000+", label: "Active Jobs", icon: Building2 },
  { value: "12,000+", label: "Companies", icon: Globe },
  { value: "2.4M+", label: "Job Seekers", icon: Users },
  { value: "98.5%", label: "Satisfaction Rate", icon: Award },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [locationTerm, setLocationTerm] = React.useState("")

  const featuredJobs = initialJobs.slice(0, 4)
  const topCompanies = initialCompanies.slice(0, 8)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080d] text-white">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-500/10 blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[140px]"
      />

      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <Sparkles className="size-3.5 text-indigo-400" /> Over 1,200 New Tech & Design Roles This Week
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Opportunities That <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Accelerate Your Career</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            HireLoop bridges visionary professionals with world-class engineering teams. Discover verified roles with salary transparency and automated status tracking.
          </p>

          {/* Search Box */}
          <div className="mt-10 w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0c0e18]/90 p-2.5 shadow-2xl backdrop-blur-xl sm:flex sm:items-center">
            <div className="flex flex-1 items-center px-3 py-2">
              <Search className="size-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, skill, or company name..."
                className="ml-3 w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="flex flex-1 items-center px-3 py-2">
              <MapPin className="size-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="City, State, or 'Remote'"
                className="ml-3 w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>

            <Link
              href={`/jobs?q=${encodeURIComponent(searchTerm)}`}
              className="mt-2 block rounded-xl bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all sm:mt-0 sm:shrink-0"
            >
              Search Jobs
            </Link>
          </div>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {navChips.map((chip) => (
              <Link
                key={chip}
                href="/jobs"
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-zinc-400 hover:border-indigo-500/40 hover:text-white transition-colors"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        {/* Global Network Image Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent shadow-2xl">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <Image
              src={globeImg}
              alt="Global Talent Map"
              className="size-full object-cover opacity-60"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-[#08080d]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center sm:p-12">
              <p className="max-w-xl text-lg font-semibold text-white sm:text-2xl">
                Empowering more than <span className="text-indigo-400">150,000</span> candidates to discover and secure high-impact roles.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <Icon className="size-4 text-indigo-400" />
                  <span className="text-[11px] font-medium text-zinc-500">{stat.label}</span>
                </div>
                <div className="mt-3 text-3xl font-extrabold tracking-tight text-white">{stat.value}</div>
              </div>
            )
          })}
        </div>

        {/* Top Hiring Companies Logos */}
        <div className="mt-24 border-t border-white/[0.06] pt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Trusted by hiring managers at leading technology teams
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {topCompanies.map((c) => (
              <Link
                key={c.id}
                href="/companies"
                className="group flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 hover:border-white/20 transition-all"
              >
                <div className="flex size-7 items-center justify-center">
                  <Image src={c.logo} alt={c.name} width={24} height={24} className="size-5 object-contain" />
                </div>
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Jobs Section */}
        <div className="mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                <TrendingUp className="size-3.5" /> Featured Opportunities
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Recent Openings with Top Compensation
              </h2>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Browse All 1,200+ Jobs <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-3xl border border-white/[0.07] bg-[#0c0e18] p-6 transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#101322] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#161a2b] p-2.5">
                      <Image src={job.logo} alt={job.company} width={36} height={36} className="size-8 object-contain" />
                    </div>
                    <div>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="text-base font-bold text-white transition-colors hover:text-indigo-400 sm:text-lg"
                      >
                        {job.title}
                      </Link>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    Featured
                  </span>
                </div>

                <p className="mt-4 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-xs font-bold text-indigo-300">{job.salary}</span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="rounded-xl bg-indigo-600/20 border border-indigo-500/30 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    View Role
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose HireLoop Section */}
        <div className="mt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Modern Talent & Elite Teams
            </h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
              Skip traditional job board friction with automated status updates, upfront salaries, and verified recruiters.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-8">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">100% Verified Employers</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Every company registration is vetted by administrators before posting, eliminating spam and ghost positions.
              </p>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-8">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <CheckCircle2 className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Application Funnel Tracking</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Know exactly where your candidacy stands in real-time — from initial submission to interview scheduling and offer.
              </p>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-8">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                <TrendingUp className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Transparent Salary Insights</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Compare verified market salary ranges, bonuses, and equity compensation before investing time applying.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Call to Action Banner */}
        <div className="mt-32 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/80 via-[#0d1022] to-purple-950/80 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-indigo-500/20 blur-[120px]" />
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
            Ready to Take Your Next Career Leap?
          </h2>
          <p className="mt-4 text-sm text-zinc-300 max-w-xl mx-auto sm:text-base">
            Join thousands of professionals landing higher compensation and flexible remote careers on HireLoop.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/jobs"
              className="rounded-2xl bg-indigo-600 px-8 py-3.5 text-xs font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:bg-indigo-500 transition-all"
            >
              Browse Open Roles
            </Link>
            <Link
              href="/dashboard/recruiter?tab=post-job"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-semibold text-white hover:bg-white/10 transition-all"
            >
              Post a Job for Free
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/[0.06] pt-12 text-xs text-zinc-500">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider">For Job Seekers</h4>
              <ul className="mt-3 space-y-2">
                <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/companies" className="hover:text-white">Company Directory</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Seeker Plans</Link></li>
                <li><Link href="/dashboard/seeker" className="hover:text-white">Seeker Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider">For Employers</h4>
              <ul className="mt-3 space-y-2">
                <li><Link href="/dashboard/recruiter?tab=post-job" className="hover:text-white">Post a Job</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Hiring Pricing</Link></li>
                <li><Link href="/dashboard/recruiter" className="hover:text-white">Recruiter Portal</Link></li>
                <li><Link href="/companies" className="hover:text-white">Verified Companies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider">Platform</h4>
              <ul className="mt-3 space-y-2">
                <li><Link href="/dashboard/admin" className="hover:text-white">Admin Dashboard</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Billing & Tiers</Link></li>
                <li><Link href="/sign-in" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/sign-up" className="hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider">HireLoop</h4>
              <p className="mt-3 leading-relaxed">
                The next-generation career marketplace connecting ambitious talent with world-class engineering teams.
              </p>
              <p className="mt-3">© 2026 HireLoop Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
