import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthNav from '../components/AuthNav'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { user, ready, login } = useAuth()
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (ready && user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const username = form.get('username')?.trim()
    const password = form.get('password')

    if (!/^[A-Za-z0-9._%+@' -]{2,80}$/.test(username)) {
      setStatus({ type: 'error', text: 'Enter a valid email or name' })
      return
    }

    setPending(true)
    setStatus(null)

    try {
      const data = await login({ username, password })
      setStatus({ type: 'success', text: `Welcome back, ${data.user.firstname}.` })
      navigate('/')
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <AuthNav
        prompt="Don't have an account?"
        actionLabel="Sign Up"
        actionTo="/signup"
      />
      <div className="auth-wrapper">
        <div className="auth-card">
          <p className="auth-card__eyebrow">Welcome back</p>
          <h1>Log in to CrowdNest</h1>
          <p className="auth-card__lead">Use the email you signed up with to continue.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email or name</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-field__toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true" />
              </button>
            </div>

            {status ? (
              <p className={`auth-status auth-status--${status.type}`} role="status">
                {status.text}
              </p>
            ) : null}

            <button type="submit" disabled={pending}>
              {pending ? 'Signing in…' : 'Log In'}
            </button>
          </form>
          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup"><strong>Sign up</strong></Link>
          </p>
        </div>
      </div>
    </>
  )
}
