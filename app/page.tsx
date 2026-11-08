import Image from "next/image"
import {
  Search,
  Globe,
  Building2,
  Users,
  Award,
  MapPin,
} from "lucide-react"
import globeImg from "@/app/assets/globe.png"

const navChips = ["Trending jobs", "Featured jobs", "Engineering", "Go-To-Market"]

const stats = [
  { value: "50K", label: "Active Jobs", icon: Building2 },
  { value: "12K", label: "Companies", icon: Globe },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Award },
]

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-indigo-500/50 hover:text-indigo-300">
      {children}
    </span>
  )
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Building2 }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-indigo-400" />
        <span className="ml-auto text-[11px] font-medium text-zinc-500">{label}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-white tracking-tight">{value}</div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#08080d] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-500/10 blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1360px] px-6 py-20 lg:px-10 lg:py-28">

        <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 backdrop-blur-sm text-indigo-300 text-xs font-medium tracking-tight">
          <span className="text-indigo-400">💸</span>
          $50K+ &middot; New Jobs This Month
        </div>

        <div className="mt-8 text-center">
          <h1 className="max-w-[62ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find Your Dream Job Today
          </h1>
          <p className="mt-5 max-w-[48ch] text-base text-pretty text-zinc-400 text-center lg:text-lg">
            Hireloop connects ambitious talent with world-class companies. Browse
            thousands of curated opportunities and find your next role — faster.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:max-w-[960px]">
          <div className="flex w-full max-w-[520px] items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/70 transition-colors">
            <Search className="size-5 text-zinc-400 shrink-0" />
            <input
              className="flex-1 min-w-0 bg-transparent text-white placeholder-zinc-500 outline-none"
              placeholder="Job title, skill or company"
            />
            <button className="ml-3 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:bg-indigo-500 transition-colors">
              Search
            </button>
          </div>

          <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-indigo-500/60 hover:text-indigo-300 hover:bg-indigo-500/10">
            <MapPin className="mr-1.5 size-4 text-zinc-400" /> Remote or New York
          </button>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {navChips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Image
            src={globeImg}
            alt="Globe"
            className="absolute inset-0 size-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080d]/10 via-[#08080d]/30 to-[#08080d]/95" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center sm:p-16">
            <p className="text-lg font-medium text-white leading-relaxed sm:text-xl">
              Assisting over <span className="text-indigo-400">15,000</span> job
              seekers find their dream positions.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

      </div>
    </main>
  )
}
