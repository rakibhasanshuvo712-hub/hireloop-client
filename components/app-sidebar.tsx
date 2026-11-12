"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  PlusCircle,
  Briefcase,
  Users,
  Building,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  // Determine current active role from pathname or fallback to Seeker
  const activeRole: "seeker" | "recruiter" | "admin" = pathname.includes("/recruiter") || pathname.includes("/recruter")
    ? "recruiter"
    : pathname.includes("/admin")
    ? "admin"
    : "seeker"

  const seekerLinks = [
    { title: "Overview", href: "/dashboard/seeker", icon: LayoutDashboard },
    { title: "Browse Jobs", href: "/jobs", icon: Search },
    { title: "Saved Jobs", href: "/dashboard/seeker?tab=saved", icon: Bookmark },
    { title: "My Applications", href: "/dashboard/seeker?tab=applications", icon: FileText },
    { title: "Subscription & Billing", href: "/dashboard/seeker?tab=billing", icon: CreditCard },
    { title: "Profile & Resume", href: "/dashboard/seeker?tab=settings", icon: Settings },
  ]

  const recruiterLinks = [
    { title: "Overview", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { title: "Post a New Job", href: "/dashboard/recruiter?tab=post-job", icon: PlusCircle },
    { title: "Manage Job Posts", href: "/dashboard/recruiter?tab=jobs", icon: Briefcase },
    { title: "Candidate Applicants", href: "/dashboard/recruiter?tab=applicants", icon: Users },
    { title: "Company Profile", href: "/dashboard/recruiter?tab=company", icon: Building },
    { title: "Hiring Plan & Billing", href: "/dashboard/recruiter?tab=billing", icon: CreditCard },
  ]

  const adminLinks = [
    { title: "Platform Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Manage Users", href: "/dashboard/admin?tab=users", icon: Users },
    { title: "Company Verification", href: "/dashboard/admin?tab=companies", icon: Building },
    { title: "Job Moderation", href: "/dashboard/admin?tab=jobs", icon: Briefcase },
    { title: "Payments & Revenue", href: "/dashboard/admin?tab=payments", icon: DollarSign },
  ]

  const currentLinks =
    activeRole === "admin"
      ? adminLinks
      : activeRole === "recruiter"
      ? recruiterLinks
      : seekerLinks

  const displayName = session?.user?.name || "Demo User"
  const displayEmail = session?.user?.email || "user@hireloop.io"

  return (
    <Sidebar className="border-r border-white/[0.08] bg-[#0c0d14] text-zinc-300">
      <SidebarHeader className="p-4 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2 px-1 py-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <div className="flex size-full items-center justify-center rounded-[11px] bg-[#0c0d14]">
              <Sparkles className="size-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
              <span>Hire<span className="text-indigo-400">Loop</span></span>
              <span className="rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                {activeRole}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">Talent & Hiring Hub</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Role Switcher Pills for convenience */}
        <div className="mb-4 rounded-xl border border-white/5 bg-white/[0.02] p-1.5">
          <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
            Preview Role View
          </p>
          <div className="grid grid-cols-3 gap-1">
            <Link
              href="/dashboard/seeker"
              className={`rounded-lg py-1.5 text-center text-xs font-medium transition-all ${
                activeRole === "seeker"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Seeker
            </Link>
            <Link
              href="/dashboard/recruiter"
              className={`rounded-lg py-1.5 text-center text-xs font-medium transition-all ${
                activeRole === "recruiter"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Recruiter
            </Link>
            <Link
              href="/dashboard/admin"
              className={`rounded-lg py-1.5 text-center text-xs font-medium transition-all ${
                activeRole === "admin"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-zinc-400 px-2 tracking-wider uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 mt-1">
              {currentLinks.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white data-[active=true]:bg-indigo-600 data-[active=true]:text-white data-[active=true]:shadow-[0_0_20px_rgba(79,70,229,0.35)]"
                    >
                      <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span className="flex-1">{item.title}</span>
                      <ChevronRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-white/10" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-zinc-400 px-2 tracking-wider uppercase">
            Marketplace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 mt-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/jobs" />}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <Search className="size-4 shrink-0" />
                  <span>Public Job Board</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/companies" />}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <Building className="size-4 shrink-0" />
                  <span>Companies Directory</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/pricing" />}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <DollarSign className="size-4 shrink-0" />
                  <span>Pricing & Tiers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-2.5 border border-white/5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600/30 font-semibold text-indigo-300 border border-indigo-500/20">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium text-white">{displayName}</p>
            <p className="truncate text-[11px] text-zinc-400">{displayEmail}</p>
          </div>
          <button
            onClick={() => authClient.signOut().then(() => window.location.href = "/")}
            title="Sign out"
            className="text-zinc-500 hover:text-red-400 transition-colors p-1"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
