"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  MapPin,
  Filter,
  Bookmark,
  Briefcase,
  DollarSign,
  Building2,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"

import { initialJobs, Job } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>(initialJobs)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState("all")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [savedJobIds, setSavedJobIds] = React.useState<string[]>(["job-1"])
  const [appliedJobIds, setAppliedJobIds] = React.useState<string[]>([])
  const [applyingJob, setApplyingJob] = React.useState<Job | null>(null)
  const [coverNote, setCoverNote] = React.useState("")
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)

  const categories = ["All", "Design", "Engineering", "Product", "Marketing"]
  const jobTypes = ["Full-time", "Remote", "Contract", "Part-time"]

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    )
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyingJob) return
    setAppliedJobIds((prev) => [...prev, applyingJob.id])
    setApplyingJob(null)
    setCoverNote("")
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 4000)
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.type)

    const matchesLocation =
      selectedLocation === "all" ||
      (selectedLocation === "remote" && job.type === "Remote") ||
      (selectedLocation === "hybrid" && job.location.includes("Hybrid"))

    return matchesSearch && matchesCategory && matchesType && matchesLocation
  })

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0f172a]/95 px-5 py-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">Application Submitted!</h4>
            <p className="text-xs text-zinc-300">Your profile and resume were delivered to the recruiter.</p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0f121d] via-[#0b0c14] to-[#08080d] px-6 py-12 lg:px-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                <Sparkles className="size-3.5" /> Over 1,200+ Verified Positions
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Explore Top Tech & Design Opportunities
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
                Discover roles curated directly by premier engineering organizations and visionary startups.
              </p>
            </div>
            <Link
              href="/dashboard/seeker"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
            >
              <Bookmark className="size-4 text-indigo-400" />
              View Saved Jobs ({savedJobIds.length})
            </Link>
          </div>

          {/* Search Bar Bar */}
          <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-[#0c0e18]/80 p-3 shadow-2xl backdrop-blur-xl md:grid-cols-12">
            <div className="flex items-center gap-3 px-3 md:col-span-5">
              <Search className="size-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>

            <div className="hidden h-8 w-px bg-white/10 md:block self-center" />

            <div className="flex items-center gap-3 px-3 md:col-span-4">
              <MapPin className="size-5 text-zinc-400 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter jobs by location"
                className="w-full bg-transparent text-sm text-white outline-none cursor-pointer [&>option]:bg-[#0d0f1a] [&>option]:text-white"
              >
                <option value="all">All Locations & Remote</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid Positions</option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                onClick={() => {}}
                className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:bg-indigo-500"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Filters + Job Cards */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 rounded-2xl border border-white/[0.08] bg-[#0c0e18]/90 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white uppercase">
                  <SlidersHorizontal className="size-4 text-indigo-400" /> Filters
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedTypes([])
                    setSelectedLocation("all")
                    setSearchQuery("")
                  }}
                  className="text-xs text-zinc-400 hover:text-indigo-400 transition-colors"
                >
                  Reset all
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Category
                </label>
                <div className="mt-3 flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <CheckCircle2 className="size-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type Checkboxes */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Employment Type
                </label>
                <div className="mt-3 space-y-2">
                  {jobTypes.map((type) => {
                    const checked = selectedTypes.includes(type)
                    return (
                      <label
                        key={type}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 text-xs text-zinc-300 hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleType(type)}
                          className="size-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer"
                        />
                        <span>{type}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Salary Range Preview */}
              <div className="border-t border-white/[0.06] pt-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Salary Band
                </label>
                <div className="mt-2 text-xs text-zinc-400">
                  $100k - $280k+ / year
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Job Cards List */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-zinc-400">
                Showing <span className="font-semibold text-white">{filteredJobs.length}</span> curated jobs
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Sort by:</span>
                <span className="font-medium text-white">Most Relevant</span>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-12 text-center">
                <Building2 className="mx-auto size-12 text-zinc-600" />
                <h3 className="mt-4 text-lg font-semibold text-white">No jobs matched your criteria</h3>
                <p className="mt-1 text-sm text-zinc-400">Try loosening your search filters or resetting them.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedTypes([])
                    setSearchQuery("")
                  }}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id)
                const isApplied = appliedJobIds.includes(job.id)

                return (
                  <div
                    key={job.id}
                    className="group relative rounded-2xl border border-white/[0.07] bg-[#0c0e18]/80 p-5 transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#101322] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#141829] p-2.5 shadow-inner">
                          <Image
                            src={job.logo}
                            alt={job.company}
                            width={40}
                            height={40}
                            className="size-8 object-contain"
                          />
                        </div>

                        {/* Title and details */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-base font-semibold text-white transition-colors hover:text-indigo-400 sm:text-lg"
                            >
                              {job.title}
                            </Link>
                            {job.featured && (
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                            <span className="font-medium text-zinc-300">{job.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3 text-zinc-500" />
                              {job.location}
                            </span>
                            <span>•</span>
                            <span>{job.postedAt}</span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                              {job.type}
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                              {job.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={(e) => toggleSave(job.id, e)}
                          title={isSaved ? "Saved" : "Save Job"}
                          className={`flex size-10 items-center justify-center rounded-xl border transition-colors ${
                            isSaved
                              ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-400"
                              : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <Bookmark className={`size-4 ${isSaved ? "fill-indigo-400" : ""}`} />
                        </button>

                        <Link
                          href={`/jobs/${job.id}`}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
                        >
                          View Details
                        </Link>

                        {isApplied ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-2.5 text-xs font-semibold text-emerald-400 cursor-default"
                          >
                            <CheckCircle2 className="size-3.5" /> Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => setApplyingJob(job)}
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all"
                          >
                            Easy Apply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {/* Pagination UI */}
            <div className="mt-8 flex items-center justify-center gap-2 pt-6">
              <button aria-label="Previous page" className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white">
                <ChevronLeft className="size-4" />
              </button>
              <button className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm">
                1
              </button>
              <button className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white">
                2
              </button>
              <button className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white">
                3
              </button>
              <button aria-label="Next page" className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#161a2b]">
                  <Image src={applyingJob.logo} alt={applyingJob.company} width={24} height={24} className="size-6 object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Apply to {applyingJob.company}</h3>
                  <p className="text-xs text-zinc-400">{applyingJob.title}</p>
                </div>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="text-zinc-400 hover:text-white"
              >
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
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  defaultValue="alex.rivera@example.com"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300">Cover Note / Introduction</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell the hiring manager why you're a great fit for this role..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-300">
                📄 Your current profile resume <strong>(Alex_Rivera_CV_2026.pdf)</strong> will be automatically attached.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
