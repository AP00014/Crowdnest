import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      match: [/^[A-Za-z][A-Za-z' -]{1,29}$/, 'Enter a valid first name'],
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      match: [/^[A-Za-z][A-Za-z' -]{1,29}$/, 'Enter a valid last name'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email'],
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.toPublic = function toPublic() {
  return {
    id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
  }
}

userSchema.statics.findByLogin = function findByLogin(username) {
  const key = username.trim().toLowerCase()
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return this.findOne({
    $or: [{ email: key }, { firstname: { $regex: `^${escaped}$`, $options: 'i' } }],
  })
}

export const UserModel = mongoose.model('User', userSchema)
