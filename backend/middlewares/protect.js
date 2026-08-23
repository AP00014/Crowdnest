import { UserModel } from '../models/UserModel.js'
import { verifyToken } from '../utils/jwt.js'

export async function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Login required' })
  }

  try {
    const payload = verifyToken(token)
    const user = await UserModel.findById(payload.id)

    if (!user) {
      return res.status(401).json({ ok: false, message: 'User no longer exists' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token' })
  }
}
