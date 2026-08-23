import mongoose from 'mongoose'

export async function connectDb() {
  const uri = process.env.MONGO_URI?.trim()

  if (!uri) {
    throw new Error('MONGO_URI is missing in .env')
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
    family: 4,
  })

  console.log('MongoDB connected')
}
