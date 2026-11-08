import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { AuthForm } from "@/components/auth/auth-form"
import { auth } from "@/lib/auth"

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/")
  }

  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  )

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#08080d] p-6">
      <AuthForm defaultMode="signup" googleEnabled={googleEnabled} />
    </main>
  )
}
