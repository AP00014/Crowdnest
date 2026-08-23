const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
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

  const response = await fetch(`${API_BASE}${path}`, {
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
