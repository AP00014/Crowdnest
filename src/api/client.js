function getApiBase() {
  const fromEnv = String(import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (import.meta.env.DEV) return 'http://localhost:5000'
  return ''
}

const API_BASE = getApiBase()

if (import.meta.env.PROD && (!API_BASE || /localhost|127\.0\.0\.1/.test(API_BASE))) {
  console.warn('CrowdNest: set VITE_API_URL to your hosted API URL (no trailing slash) and rebuild.')
}
const TOKEN_KEY = 'crowdnest_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveAuth(data) {
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function api(path, options = {}) {
  const { body, headers, ...rest } = options
  const token = getToken()
  const base = getApiBase()

  if (!base) {
    throw new Error('API URL is missing. Set VITE_API_URL to your hosted backend, then rebuild the frontend.')
  }

  const response = await fetch(`${base}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = await response.json().catch(() => ({}))

  if (response.status === 404) {
    throw new Error('Login API was not found on this host. Point VITE_API_URL at the Express backend, not the website.')
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function checkApiHealth() {
  return api('/api/health')
}

export async function loginUser(credentials) {
  return saveAuth(await api('/api/auth/login', { method: 'POST', body: credentials }))
}

export async function signupUser(payload) {
  return saveAuth(await api('/api/auth/signup', { method: 'POST', body: payload }))
}

export function getCurrentUser() {
  return api('/api/auth/me')
}

export function createPledge(payload) {
  return api('/api/pledges', { method: 'POST', body: payload })
}
