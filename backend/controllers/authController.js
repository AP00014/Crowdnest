import { UserModel } from '../models/UserModel.js'
import { signToken } from '../utils/jwt.js'

function authResponse(user, message) {
  return {
    ok: true,
    message,
    token: signToken(user),
    user: user.toPublic(),
  }
}

export async function register(req, res) {
  const { firstname, lastname, email, password } = req.body
  const existing = await UserModel.findOne({ email: email.trim().toLowerCase() })

  if (existing) {
    return res.status(409).json({ ok: false, message: 'An account with this email already exists' })
  }

  const user = await UserModel.create({ firstname, lastname, email, password })
  res.status(201).json(authResponse(user, 'Account created'))
}

export async function login(req, res) {
  const user = await UserModel.findByLogin(req.body.username)
  const valid = user ? await user.matchPassword(req.body.password) : false

  if (!valid) {
    return res.status(401).json({ ok: false, message: 'Invalid username or password' })
  }

  res.json(authResponse(user, 'Logged in'))
}

export async function me(req, res) {
  res.json({
    ok: true,
    user: req.user.toPublic(),
  })
}
