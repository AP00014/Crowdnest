import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { clearAuth, getCurrentUser, getToken, loginUser, signupUser } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadUser() {
      if (!getToken()) {
        setReady(true)
        return
      }

      try {
        const data = await getCurrentUser()
        if (!cancelled) setUser(data.user)
      } catch {
        clearAuth()
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setReady(true)
      }
    }

    loadUser()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({
    user,
    ready,
    async login(credentials) {
      const data = await loginUser(credentials)
      setUser(data.user)
      return data
    },
    async signup(payload) {
      const data = await signupUser(payload)
      setUser(data.user)
      return data
    },
    logout() {
      clearAuth()
      setUser(null)
    },
  }), [user, ready])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
