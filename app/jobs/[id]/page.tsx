"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  Globe,
  Users,
  CheckCircle2,
  Sparkles,
  Share2,
  ShieldCheck,
  X,
} from "lucide-react"

import { initialJobs, Job } from "@/lib/mock-data"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = (params?.id as string) || "job-1"

  const job = initialJobs.find((j) => j.id === jobId) || initialJobs[0]
  const [isSaved, setIsSaved] = React.useState(false)
  const [isApplied, setIsApplied] = React.useState(false)
  const [showApplyModal, setShowApplyModal] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplied(true)
    setShowApplyModal(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const similarJobs = initialJobs.filter((j) => j.id !== job.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0f172a]/95 px-5 py-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">Application Sent!</h4>
            <p className="text-xs text-zinc-300">You applied for {job.title} at {job.company}.</p>
          </div>
        </div>
      )}

      {/* Top Banner Navigation */}
      <div className="border-b border-white/[0.06] bg-[#0c0d16]/80 px-6 py-4 backdrop-blur-md lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> Back to all jobs
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
            >
              <Share2 className="size-3.5" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        {/* Main Job Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-2xl lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="relative flex size-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-[#141829] p-3 shadow-inner">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={56}
                  height={56}
                  className="size-12 object-contain"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {job.title}
                  </h1>
                  {job.featured && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                      Verified Partner
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <span className="font-semibold text-zinc-200">{job.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-zinc-500" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex size-11 items-center justify-center rounded-2xl border transition-all ${
                  isSaved
                    ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-400"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <Bookmark className={`size-5 ${isSaved ? "fill-indigo-400" : ""}`} />
              </button>

              {isApplied ? (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-6 py-3 text-sm font-semibold text-emerald-400 cursor-default"
                >
                  <CheckCircle2 className="size-4" /> Applied
                </button>
              ) : (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_35px_rgba(79,70,229,0.6)]"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Stats Row (Matching Screenshot 0) */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">Experience</span>
              <p className="mt-1 text-base font-semibold text-white">{job.experience}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">Work Level</span>
              <p className="mt-1 text-base font-semibold text-white">{job.workLevel}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">Employee Type</span>
              <p className="mt-1 text-base font-semibold text-white">{job.type}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">Offer Salary</span>
              <p className="mt-1 text-base font-semibold text-indigo-400">{job.salary}</p>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column (Job Details) */}
          <div className="space-y-10 lg:col-span-2">
            {/* Description */}
            <section className="rounded-3xl border border-white/[0.06] bg-[#0c0e18]/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">Job Description</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">
                {job.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-3xl border border-white/[0.06] bg-[#0c0e18]/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">Key Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="size-4 shrink-0 text-indigo-400 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="rounded-3xl border border-white/[0.06] bg-[#0c0e18]/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">Qualifications & Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="size-1.5 shrink-0 rounded-full bg-indigo-400 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="rounded-3xl border border-white/[0.06] bg-[#0c0e18]/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">Benefits & Perks</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {job.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-zinc-200"
                  >
                    <Sparkles className="size-3 text-indigo-400" />
                    {benefit}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Company Card) */}
          <div className="space-y-6 lg:col-span-1">
            <div className="sticky top-20 rounded-3xl border border-white/[0.08] bg-[#0c0e18] p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                Company Overview
              </h3>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#161a2b] p-2.5">
                  <Image src={job.logo} alt={job.company} width={36} height={36} className="size-8 object-contain" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{job.company}</h4>
                  <p className="text-xs text-zinc-400">{job.companyOverview.industry}</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                {job.companyOverview.about}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-4 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Users className="size-3.5 text-zinc-500" /> Team Size
                  </span>
                  <span className="font-medium text-white">{job.companyOverview.size}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-zinc-500" /> Headquarters
                  </span>
                  <span className="font-medium text-white">{job.companyOverview.location}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Globe className="size-3.5 text-zinc-500" /> Website
                  </span>
                  <a
                    href={job.companyOverview.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-indigo-400 hover:underline"
                  >
                    Visit site
                  </a>
                </div>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-6">
                {isApplied ? (
                  <button
                    disabled
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/15 py-3 text-xs font-semibold text-emerald-400"
                  >
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:bg-indigo-500 transition-all"
                  >
                    Apply for this position
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs Section */}
        <section className="mt-16 border-t border-white/[0.06] pt-12">
          <h2 className="text-xl font-bold text-white">Similar Open Opportunities</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {similarJobs.map((simJob) => (
              <Link
                key={simJob.id}
                href={`/jobs/${simJob.id}`}
                className="group rounded-2xl border border-white/[0.07] bg-[#0c0e18] p-5 transition-all hover:border-indigo-500/40 hover:bg-[#101322]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-[#161a2b] p-2">
                    <Image src={simJob.logo} alt={simJob.company} width={24} height={24} className="size-6 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {simJob.title}
                    </h4>
                    <p className="text-xs text-zinc-400">{simJob.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-indigo-300">{simJob.salary}</span>
                  <span>{simJob.type}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#161a2b]">
                  <Image src={job.logo} alt={job.company} width={24} height={24} className="size-6 object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Apply to {job.company}</h3>
                  <p className="text-xs text-zinc-400">{job.title}</p>
                </div>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="text-zinc-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300">Full Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Alex Rivera"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  defaultValue="alex.rivera@example.com"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Short Note to Hiring Team</label>
                <textarea
                  rows={3}
                  placeholder="Introduce yourself and highlight relevant experience..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-300">
                📄 Verified Candidate Profile & Resume will be attached automatically.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
