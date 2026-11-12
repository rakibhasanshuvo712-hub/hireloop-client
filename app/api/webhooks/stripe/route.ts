import { NextRequest } from "next/server"
import Stripe from "stripe"
import { getPaymentsCollection, getUsersCollection, PaymentDoc, UserPlan } from "@/lib/types/database"
import { apiSuccess, apiError } from "@/lib/api-response"
import { toObjectId } from "@/lib/utils/db"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("stripe-signature")
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event

    if (stripeKey && webhookSecret && signature) {
      const stripe = new Stripe(stripeKey)
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
      } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message)
        return apiError(`Webhook Error: ${err.message}`, 400)
      }
    } else {
      // Direct payload parse for development/testing
      try {
        event = JSON.parse(rawBody)
      } catch {
        return apiError("Invalid JSON body", 400)
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const userIdStr = session.metadata?.userId || session.client_reference_id
      const plan = session.metadata?.plan
      const amount = session.amount_total ? session.amount_total / 100 : 0
      const customerEmail = session.customer_details?.email || session.customer_email || ""

      if (userIdStr && plan) {
        const userObjectId = toObjectId(userIdStr)
        const usersCol = await getUsersCollection()
        const paymentsCol = await getPaymentsCollection()

        if (userObjectId) {
          // Automatically activate upgraded plan
          await usersCol.updateOne(
            { _id: userObjectId },
            {
              $set: {
                plan: plan as UserPlan,
                updatedAt: new Date(),
              },
            }
          )

          // Record or update payment record
          const existingPayment = await paymentsCol.findOne({
            stripeSessionId: session.id,
          })

          if (existingPayment) {
            await paymentsCol.updateOne(
              { _id: existingPayment._id },
              {
                $set: {
                  status: "Paid",
                  amount: amount || existingPayment.amount,
                },
              }
            )
          } else {
            const paymentDoc: PaymentDoc = {
              _id: new ObjectId(),
              userId: userObjectId,
              userEmail: customerEmail,
              stripeSessionId: session.id,
              plan,
              amount,
              currency: session.currency || "usd",
              status: "Paid",
              createdAt: new Date(),
            }
            await paymentsCol.insertOne(paymentDoc)
          }
        }
      }
    }

    return apiSuccess({ received: true })
  } catch (error: any) {
    console.error("POST /api/webhooks/stripe error:", error)
    return apiError("Webhook handler failed", 500)
  }
}
