import jwt from 'jsonwebtoken'

const SECRET = 'mysecret' // In production, use a secure .env secret

export function getUserIdFromAuthHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = jwt.verify(token, SECRET) as { userId: string }
    return payload.userId
  } catch {
    return null
  }
}
