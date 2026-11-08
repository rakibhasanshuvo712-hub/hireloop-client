"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type Mode = "signin" | "signup"

type Fields = {
  name: string
  email: string
  password: string
  confirm: string
}

const inputClassName =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder-zinc-500 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/70 disabled:opacity-60"

function AuthForm({
  defaultMode = "signin",
  googleEnabled = false,
}: {
  defaultMode?: Mode
  googleEnabled?: boolean
}) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [mode, setMode] = React.useState<Mode>(defaultMode)
  const [fields, setFields] = React.useState<Fields>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState<"email" | "google" | null>(null)

  const isSignup = mode === "signup"
  const busy = pending !== null

  React.useEffect(() => {
    if (session) {
      router.replace("/")
    }
  }, [session, router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function switchMode(next: Mode) {
    if (next === mode) return
    setMode(next)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const email = fields.email.trim()
    const name = fields.name.trim()
    const password = fields.password

    if (isSignup && name.length < 2) {
      setError("Please enter your full name.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    if (isSignup && password !== fields.confirm) {
      setError("Passwords do not match.")
      return
    }

    setPending("email")
    try {
      const result = isSignup
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(
          result.error.message ??
            "Something went wrong. Please check your details and try again."
        )
        return
      }

      router.replace("/")
      router.refresh()
    } catch {
      setError("Unable to reach the server. Please try again.")
    } finally {
      setPending(null)
    }
  }

  async function handleGoogle() {
    setError(null)
    setPending("google")
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (result.error) {
        setError(result.error.message ?? "Google sign-in failed. Please try again.")
        setPending(null)
      }
    } catch {
      setError("Unable to reach the server. Please try again.")
      setPending(null)
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
            !isSignup
              ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
              : "text-zinc-400 hover:text-white"
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
            isSignup
              ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
              : "text-zinc-400 hover:text-white"
          )}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {isSignup && (
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Full name</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              disabled={busy}
              placeholder="Jane Doe"
              className={inputClassName}
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            disabled={busy}
            placeholder="you@example.com"
            className={inputClassName}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={fields.password}
            onChange={handleChange}
            disabled={busy}
            placeholder="••••••••"
            className={inputClassName}
          />
        </label>

        {isSignup && (
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">
              Confirm password
            </span>
            <input
              name="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={fields.confirm}
              onChange={handleChange}
              disabled={busy}
              placeholder="••••••••"
              className={inputClassName}
            />
          </label>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={busy}
          className="w-full bg-gradient-to-b from-[#4f46e5] to-[#4338ca] py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_6px_20px_-6px_rgba(79,70,229,0.9)] hover:from-[#5b52ea] hover:to-[#4b40d6]"
        >
          {pending === "email" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {isSignup ? "Creating account..." : "Signing in..."}
            </>
          ) : isSignup ? (
            "Create account"
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {googleEnabled && (
        <>
          <div className="my-5 flex items-center gap-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <Button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-zinc-200 hover:border-indigo-500/50 hover:bg-white/10 hover:text-white"
          >
            {pending === "google" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Continue with Google"
            )}
          </Button>
        </>
      )}

      <p className="mt-6 text-center text-xs text-zinc-500">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          href={isSignup ? "/sign-in" : "/sign-up"}
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          {isSignup ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  )
}

export { AuthForm }
