import { NextRequest } from "next/server"
import Stripe from "stripe"
import { getPaymentsCollection, getUsersCollection, PaymentDoc } from "@/lib/types/database"
import { checkoutSchema } from "@/lib/validations"
import { apiSuccess, apiError, getAuthContext } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

const PLAN_PRICES: Record<string, number> = {
  Pro: 19,
  Premium: 39,
  Growth: 49,
  Enterprise: 149,
}

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await getAuthContext()
    if (errorResponse) return errorResponse

    const user = auth!.user
    const userObjectId = toObjectId(user.id)
    if (!userObjectId) {
      return apiError("Invalid user session", 400)
    }

    const json = await req.json()
    const parsed = checkoutSchema.safeParse(json)
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
      return apiError(message, 400)
    }

    const { plan, successUrl, cancelUrl, testPayment } = parsed.data
    const price = PLAN_PRICES[plan]
    if (!price) {
      return apiError(`Invalid plan: ${plan}`, 400)
    }

    const paymentsCol = await getPaymentsCollection()
    const usersCol = await getUsersCollection()

    const stripeKey = process.env.STRIPE_SECRET_KEY

    // If testPayment is true or Stripe key is not configured, process test payment directly
    if (testPayment || !stripeKey) {
      const testSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(7)}`
      const paymentRecord: PaymentDoc = {
        _id: new ObjectId(),
        userId: userObjectId,
        userEmail: user.email,
        stripeSessionId: testSessionId,
        plan,
        amount: price,
        currency: "usd",
        status: "Paid",
        createdAt: new Date(),
      }

      await paymentsCol.insertOne(paymentRecord)

      // Automatically activate upgraded plan
      await usersCol.updateOne(
        { _id: userObjectId },
        {
          $set: {
            plan,
            updatedAt: new Date(),
          },
        }
      )

      return apiSuccess({
        simulated: true,
        plan,
        amount: price,
        status: "Paid",
        sessionId: testSessionId,
        message: `Plan successfully upgraded to ${plan}`,
      })
    }

    // Real Stripe Checkout Session
    const stripe = new Stripe(stripeKey)
    const origin = req.headers.get("origin") || process.env.BETTER_AUTH_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `HireLoop ${plan} Plan Subscription`,
              description: `Access to HireLoop ${plan} tier features`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        plan,
      },
      success_url:
        successUrl || `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
      cancel_url: cancelUrl || `${origin}/pricing?payment=cancelled`,
    })

    // Record pending payment
    const paymentRecord: PaymentDoc = {
      _id: new ObjectId(),
      userId: userObjectId,
      userEmail: user.email,
      stripeSessionId: session.id,
      plan,
      amount: price,
      currency: "usd",
      status: "Pending",
      createdAt: new Date(),
    }

    await paymentsCol.insertOne(paymentRecord)

    return apiSuccess({
      url: session.url,
      sessionId: session.id,
    })
  } catch (error: any) {
    console.error("POST /api/checkout error:", error)
    return apiError(error.message || "Checkout session creation failed", 500)
  }
}
