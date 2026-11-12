"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard/seeker" },
]

const ctaClassName =
  "h-9 rounded-lg bg-gradient-to-b from-[#4f46e5] to-[#4338ca] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_6px_20px_-6px_rgba(79,70,229,0.9)] hover:from-[#5b52ea] hover:to-[#4b40d6] sm:h-10 sm:px-6 sm:text-[15px]"

function Logo() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-1.5"
      aria-label="Hireloop home"
    >
      <span className="text-xl leading-none font-semibold tracking-tight text-[#4c8df0] sm:text-[22px]">
        hire
      </span>
      <span className="relative flex h-5 w-7 items-center justify-center sm:h-[22px] sm:w-[30px]">
        <span className="absolute left-0 size-[18px] rounded-full border-[3px] border-[#3f7fe8] mix-blend-screen sm:size-[20px]" />
        <span className="absolute right-0 size-[18px] rounded-full border-[3px] border-[#e9741f] mix-blend-screen sm:size-[20px]" />
      </span>
      <span className="text-xl leading-none font-semibold tracking-tight text-[#e9741f] sm:text-[22px]">
        p
      </span>
    </Link>
  )
}

function SiteHeader() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [signingOut, setSigningOut] = React.useState(false)

  const user = session?.user
  const displayName = user?.name?.trim() || user?.email || "Account"
  const initial = displayName.charAt(0).toUpperCase()

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await authClient.signOut()
      router.replace("/")
      router.refresh()
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08080d]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-10">
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 md:flex lg:gap-12"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white lg:text-[15px]"
              >
                {link.label}
              </Link>
            ))}

            <Separator
              orientation="vertical"
              className="h-5 bg-white/15 data-vertical:self-center"
            />

            {user ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-semibold text-indigo-300">
                    {initial}
                  </span>
                  <span className="max-w-[140px] truncate text-sm font-medium text-zinc-300 lg:max-w-[180px]">
                    {displayName}
                  </span>
                </span>

                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="h-9 gap-1.5 px-3 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  {signingOut ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  <span className="hidden lg:inline">Sign out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-[#9b93c9] transition-colors hover:text-white lg:text-[15px]"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className={cn(
                    "hidden text-sm font-medium text-white sm:inline-flex",
                    "rounded-lg bg-gradient-to-b from-[#4f46e5] to-[#4338ca] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_6px_20px_-6px_rgba(79,70,229,0.9)] hover:from-[#5b52ea] hover:to-[#4b40d6] sm:px-6 sm:text-[15px]"
                  )}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {!user && (
            <Button
              render={<Link href="/sign-up" />}
              nativeButton={false}
              className={cn("hidden sm:inline-flex md:hidden", ctaClassName)}
            >
              Get Started
            </Button>
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-zinc-300 hover:bg-white/5 hover:text-white md:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-sm gap-0 border-white/10 bg-[#0b0b12] p-0 text-white"
            >
              <SheetHeader className="border-b border-white/[0.06] p-5">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
              >
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-[15px] font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                <Separator className="my-2 bg-white/10" />

                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="truncate text-[15px] font-medium text-white">
                        {displayName}
                      </p>
                      {user.email && user.name ? (
                        <p className="truncate text-xs text-zinc-500">
                          {user.email}
                        </p>
                      ) : null}
                    </div>

                    <SheetClose
                      render={
                        <button
                          type="button"
                          onClick={handleSignOut}
                          disabled={signingOut}
                          className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-[15px] font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
                        />
                      }
                    >
                      {signingOut ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <LogOut className="size-4" />
                      )}
                      Sign out
                    </SheetClose>
                  </>
                ) : (
                  <SheetClose
                    render={
                      <Link
                        href="/sign-in"
                        className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#9b93c9] transition-colors hover:bg-white/5 hover:text-white"
                      />
                    }
                  >
                    Sign In
                  </SheetClose>
                )}
              </nav>

              {!user && (
                <SheetFooter className="border-t border-white/[0.06] p-4">
                  <SheetClose
                    render={
                      <Link
                        href="/sign-up"
                        className={cn(buttonVariants(), "w-full", ctaClassName)}
                      />
                    }
                  >
                    Get Started
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
