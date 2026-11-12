"use client"

import * as React from "react"
import Link from "next/link"
import {
  Check,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react"

export default function PricingPage() {
  const [roleTab, setRoleTab] = React.useState<"seekers" | "recruiters">("seekers")
  const [selectedPlan, setSelectedPlan] = React.useState<{
    name: string
    price: number
    interval: string
    role: string
  } | null>(null)

  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "paypal">("card")
  const [cardNumber, setCardNumber] = React.useState("•••• •••• •••• 4242")
  const [cardExpiry, setCardExpiry] = React.useState("12/28")
  const [cardCvc, setCardCvc] = React.useState("987")
  const [cardHolder, setCardHolder] = React.useState("Alex Rivera")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const seekerPlans = [
    {
      name: "Free",
      price: 0,
      description: "Essential tools for casual job browsing and initial discovery.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Standard candidate profile",
        "Weekly email alerts",
      ],
      cta: "Current Plan",
      popular: false,
    },
    {
      name: "Pro",
      price: 19,
      description: "Designed for active job hunters seeking rapid placement.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Real-time application status tracking",
        "Comprehensive salary insights",
        "Standard support response (under 24h)",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: 39,
      description: "Maximum visibility and unlimited career potential.",
      features: [
        "Unlimited job applications",
        "Unlimited saved jobs",
        "Profile boost directly to recruiters",
        "Early access to newly posted jobs",
        "Priority 24/7 dedicated support",
      ],
      cta: "Upgrade to Premium",
      popular: false,
    },
  ]

  const recruiterPlans = [
    {
      name: "Free",
      price: 0,
      description: "Ideal for early stage startups testing candidate flow.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard marketplace visibility",
        "Company profile listing",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Growth",
      price: 49,
      description: "For scaling companies hiring across multiple departments.",
      features: [
        "Up to 10 active job posts",
        "Advanced applicant tracking & filters",
        "Basic performance analytics",
        "Email & ticket support",
      ],
      cta: "Choose Growth",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 149,
      description: "High-volume recruitment suite for established tech organizations.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & hiring funnel dashboard",
        "Featured job listings with top badge",
        "Multi-member team collaboration",
        "Custom branding & priority support",
      ],
      cta: "Upgrade to Enterprise",
      popular: false,
    },
  ]

  const currentPlans = roleTab === "seekers" ? seekerPlans : recruiterPlans

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const closeCheckout = () => {
    setSelectedPlan(null)
    setIsSuccess(false)
  }

  const faqs = [
    {
      q: "Can I cancel or switch my subscription at any time?",
      a: "Yes! You can upgrade, downgrade, or cancel your plan at any moment from your billing dashboard. Changes take effect at the end of your billing cycle with no penalty.",
    },
    {
      q: "How does the active job posts limit work for recruiters?",
      a: "The limit applies only to currently published 'Active' jobs. Once a role is filled and marked as 'Closed', it frees up a slot so you can post your next job.",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "All paid plans come with a no-questions-asked 14-day refund guarantee if you are not completely satisfied.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "We support all major international credit/debit cards (Visa, Mastercard, American Express) powered by Stripe, as well as PayPal.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="size-3.5" /> Transparent, Predictable Pricing
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Pick the Plan That Accelerates Your Career
          </h1>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg max-w-2xl mx-auto">
            Whether you are landing your dream job or building a high-velocity team, HireLoop offers transparent plans with zero hidden fees.
          </p>

          {/* Role Toggle Switch */}
          <div className="mt-10 inline-flex items-center rounded-2xl border border-white/10 bg-[#0c0e18] p-1.5 shadow-xl">
            <button
              onClick={() => setRoleTab("seekers")}
              className={`rounded-xl px-6 py-2.5 text-xs font-semibold transition-all ${
                roleTab === "seekers"
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setRoleTab("recruiters")}
              className={`rounded-xl px-6 py-2.5 text-xs font-semibold transition-all ${
                roleTab === "recruiters"
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              For Recruiters & Teams
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {currentPlans.map((plan) => {
            const isPro = plan.popular
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  isPro
                    ? "border-2 border-indigo-500 bg-gradient-to-b from-[#13162b] to-[#0c0e18] shadow-[0_0_40px_rgba(79,70,229,0.25)] lg:-translate-y-2"
                    : "border border-white/[0.08] bg-[#0c0e18]/80 hover:border-white/20"
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {isPro && <Sparkles className="size-5 text-indigo-400" />}
                  </div>

                  <p className="mt-2 text-xs text-zinc-400 min-h-[36px]">{plan.description}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-zinc-400">/ month</span>
                  </div>

                  <div className="mt-8 border-t border-white/[0.06] pt-6">
                    <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                      What is included:
                    </p>
                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                          <Check className="size-4 shrink-0 text-indigo-400 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-4">
                  <button
                    onClick={() => {
                      if (plan.price === 0) {
                        alert("You are currently on the Free Tier.")
                      } else {
                        setSelectedPlan({
                          name: `${roleTab === "seekers" ? "Seeker" : "Recruiter"} ${plan.name}`,
                          price: plan.price,
                          interval: "month",
                          role: roleTab,
                        })
                      }
                    }}
                    className={`w-full rounded-2xl py-3.5 text-xs font-semibold transition-all ${
                      isPro
                        ? "bg-indigo-600 text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Security / Trust guarantee bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-white/[0.06] bg-[#0c0e18]/40 p-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>256-Bit SSL Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-indigo-400" />
            <span>Stripe Verified Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-cyan-400" />
            <span>14-Day Money Back Guarantee</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 border-t border-white/[0.06] pt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-zinc-400">Everything you need to know about plans and billing.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0c0e18] p-6">
                <h4 className="flex items-start gap-2.5 text-sm font-semibold text-white">
                  <HelpCircle className="size-4 text-indigo-400 shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stripe-Styled Checkout Modal (Matching Screenshot 0) */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0e101c] p-6 shadow-2xl sm:p-8">
            <button
              onClick={closeCheckout}
              className="absolute right-5 top-5 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>

            {!isSuccess ? (
              <>
                {/* Modal Header */}
                <div className="border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-600/30 text-indigo-400">
                      <CreditCard className="size-4" />
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                      Secure Checkout
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    Upgrade to {selectedPlan.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">${selectedPlan.price}.00</span>
                    <span className="text-xs text-zinc-400">/ {selectedPlan.interval}</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
                  {/* Payment Method Toggle */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Payment Method
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                          paymentMethod === "card"
                            ? "border border-indigo-500 bg-indigo-500/20 text-white"
                            : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <CreditCard className="size-4" /> Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                          paymentMethod === "paypal"
                            ? "border border-indigo-500 bg-indigo-500/20 text-white"
                            : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="font-bold text-sky-400">P</span> PayPal
                      </button>
                    </div>
                  </div>

                  {/* Card fields */}
                  <div>
                    <label className="text-xs font-medium text-zinc-300">Name on Card</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-300">Card Information</label>
                    <div className="mt-1 rounded-xl border border-white/10 bg-white/5 focus-within:border-indigo-500">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border-b border-white/10 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none"
                      />
                      <div className="grid grid-cols-2">
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="border-r border-white/10 bg-transparent px-3.5 py-2 text-xs text-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="bg-transparent px-3.5 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    <span>Your transaction is encrypted with TLS 1.3 through Stripe.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 disabled:opacity-60 transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Processing Payment...
                      </>
                    ) : (
                      <>Pay ${selectedPlan.price}.00 & Activate</>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success Modal (Matching Screenshot 0) */
              <div className="py-6 text-center animate-in zoom-in-95">
                <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">
                  Welcome to {selectedPlan.name}!
                </h3>
                <p className="mt-2 text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Your subscription payment of ${selectedPlan.price}.00 has been verified. Your upgraded benefits and limits have been activated immediately.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-zinc-200">tx_{Math.random().toString(36).substring(2, 11)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Billing Status:</span>
                    <span className="font-semibold text-emerald-400">Active (Renews monthly)</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={closeCheckout}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    Dismiss
                  </button>
                  <Link
                    href={`/dashboard/${selectedPlan.role === "recruiters" ? "recruiter" : "seeker"}?tab=billing`}
                    className="flex-1 rounded-xl bg-indigo-600 py-3 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 flex items-center justify-center gap-1.5"
                  >
                    Go to Dashboard <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
