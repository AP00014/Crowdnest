import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL || 'http://localhost:5000'
  const corsOrigin = env.VITE_CORS_ORIGIN || 'http://localhost:5173'

  return {
    plugins: [react()],
    base: './',
    server: {
      cors: {
        origin: corsOrigin,
      },
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  }
})
