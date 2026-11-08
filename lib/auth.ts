import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  throw new Error("MONGODB_URI is not set")
}

const client = new MongoClient(mongoUri)
const db = client.db("hireloopdb")

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {},
  database: mongodbAdapter(db, {
    client,
  }),
})
