import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env")
}

const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClient = client
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
  client = global._mongoClient!
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

let indexesInitialized = false
let indexPromise: Promise<void> | null = null

export async function ensureIndexes(db: Db): Promise<void> {
  if (indexesInitialized) return
  if (indexPromise) return indexPromise

  indexPromise = (async () => {
    try {
      // 1. jobs indexes: { category: 1, type: 1 }, { companyId: 1 }
      await db.collection("jobs").createIndex({ category: 1, type: 1 })
      await db.collection("jobs").createIndex({ companyId: 1 })
      await db.collection("jobs").createIndex({ status: 1 })
      await db.collection("jobs").createIndex({ createdAt: -1 })

      // 2. applications indexes: { seekerId: 1, jobId: 1 } (unique compound), { jobId: 1 }, { companyId: 1 }
      await db.collection("applications").createIndex(
        { seekerId: 1, jobId: 1 },
        { unique: true }
      )
      await db.collection("applications").createIndex({ jobId: 1 })
      await db.collection("applications").createIndex({ companyId: 1 })
      await db.collection("applications").createIndex({ appliedAt: -1 })

      // 3. saved_jobs indexes: { seekerId: 1, jobId: 1 } (unique compound)
      await db.collection("saved_jobs").createIndex(
        { seekerId: 1, jobId: 1 },
        { unique: true }
      )
      await db.collection("saved_jobs").createIndex({ seekerId: 1 })

      // 4. companies indexes: { recruiterId: 1 }, { status: 1 }
      await db.collection("companies").createIndex({ recruiterId: 1 })
      await db.collection("companies").createIndex({ status: 1 })

      // 5. payments indexes: { userId: 1 }, { stripeSessionId: 1 }
      await db.collection("payments").createIndex({ userId: 1 })
      await db.collection("payments").createIndex({ stripeSessionId: 1 })

      indexesInitialized = true
    } catch (error) {
      console.error("Failed to initialize database indexes:", error)
    }
  })()

  return indexPromise
}

export async function getDb(dbName: string = "hireloopdb"): Promise<Db> {
  const c = await clientPromise
  const db = c.db(dbName)
  await ensureIndexes(db)
  return db
}

export { client, clientPromise }
export default clientPromise
