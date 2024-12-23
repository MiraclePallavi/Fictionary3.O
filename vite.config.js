import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : 'http://localhost:5173'
    },
    build: {
      outDir: 'dist',  // Vercel expects the build to be in the 'dist' folder
    },
  },
  plugins: [react()],
})
