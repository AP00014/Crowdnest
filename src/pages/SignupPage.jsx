import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthNav from '../components/AuthNav'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function SignupPage() {
  const navigate = useNavigate()
  const { user, ready, signup } = useAuth()
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  if (ready && user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const password = form.get('password')
    const confirmPassword = form.get('confirm-password')

    const firstname = form.get('firstname')?.trim()
    const lastname = form.get('lastname')?.trim()
    const email = form.get('email')?.trim()
    const nameRegex = /^[A-Za-z][A-Za-z' -]{1,29}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

    if (password !== confirmPassword) {
      setStatus({ type: 'error', text: 'Passwords do not match' })
      return
    }

    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      setStatus({ type: 'error', text: 'Names can only contain letters, spaces, hyphens, or apostrophes' })
      return
    }

    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', text: 'Enter a valid email' })
      return
    }

    if (!passwordRegex.test(password)) {
      setStatus({
        type: 'error',
        text: 'Password must be at least 8 characters and include a letter and a number',
      })
      return
    }

    setPending(true)
    setStatus(null)

    try {
      await signup({ firstname, lastname, email, password })
      setStatus({ type: 'success', text: 'Account created. Redirecting…' })
      window.setTimeout(() => navigate('/'), 800)
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <AuthNav
        prompt="Already have an account?"
        actionLabel="Log In"
        actionTo="/login"
      />
      <div className="auth-wrapper">
        <div className="auth-card auth-card--wide">
          <h1>Create an account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" placeholder="John" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" placeholder="Doe" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="At least 8 characters, with a number" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Repeat your password"
                required
              />
            </div>

            {status ? (
              <p className={`auth-status auth-status--${status.type}`} role="status">
                {status.text}
              </p>
            ) : null}

            <button type="submit" disabled={pending}>
              {pending ? 'Creating account…' : 'Sign Up'}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login"><strong>Log in</strong></Link>
          </p>
        </div>
      </div>
    </>
  )
}
