export function errorHandler(err, _req, res, _next) {
  if (err.code === 11000) {
    return res.status(409).json({
      ok: false,
      message: 'An account with this email already exists',
    })
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)[0]?.message || 'Invalid data'
    return res.status(400).json({ ok: false, message })
  }

  const status = err.status || 500
  res.status(status).json({
    ok: false,
    message: status === 500 ? 'Server error' : err.message,
  })
}
