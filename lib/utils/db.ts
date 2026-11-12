import { ObjectId } from "mongodb"

export function toObjectId(id: string | ObjectId): ObjectId | null {
  if (id instanceof ObjectId) return id
  if (typeof id !== "string" || !ObjectId.isValid(id)) {
    return null
  }
  try {
    return new ObjectId(id)
  } catch {
    return null
  }
}

export function isValidObjectId(id: any): boolean {
  return ObjectId.isValid(id)
}
