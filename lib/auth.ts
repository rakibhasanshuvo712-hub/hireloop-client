import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { client } from "./mongodb"

const db = client.db("hireloopdb")

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
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
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "Seeker",
        input: true,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "Active",
        input: false,
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "Free",
        input: false,
      },
      companyId: {
        type: "string",
        required: false,
      },
      resumeUrl: {
        type: "string",
        required: false,
      },
      headline: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      skills: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
