export const nameRegex = /^[A-Za-z][A-Za-z' -]{1,29}$/
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
export const loginRegex = /^[A-Za-z0-9._%+@' -]{2,80}$/

export function validateRegister(req, res, next) {
  const { firstname, lastname, email, password } = req.body ?? {}

  if (!firstname?.trim() || !lastname?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' })
  }

  if (!nameRegex.test(firstname.trim()) || !nameRegex.test(lastname.trim())) {
    return res.status(400).json({ ok: false, message: 'Names can only contain letters, spaces, hyphens, or apostrophes' })
  }

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ ok: false, message: 'Enter a valid email' })
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      ok: false,
      message: 'Password must be at least 8 characters and include a letter and a number',
    })
  }

  next()
}

export function validateLogin(req, res, next) {
  const { username, password } = req.body ?? {}

  if (!username?.trim() || !password) {
    return res.status(400).json({ ok: false, message: 'Username and password are required' })
  }

  if (!loginRegex.test(username.trim())) {
    return res.status(400).json({ ok: false, message: 'Enter a valid email or name' })
  }

  next()
}
