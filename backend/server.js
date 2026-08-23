import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000
const corsOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'CrowdNest API is connected' })
})

app.use('/api/auth', authRoutes)
app.use(errorHandler)

async function start() {
  await connectDb()
  app.listen(PORT, () => {
    console.log(`CrowdNest API running on http://localhost:${PORT}`)
    console.log(`CORS allowed: ${corsOrigins.join(', ')}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
