import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#08080d] text-white">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/[0.06] bg-[#08080d]/80 px-6 backdrop-blur-xl">
            <SidebarTrigger className="text-zinc-400 hover:text-white" />
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>HireLoop Workspace</span>
            </div>
          </header>
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
