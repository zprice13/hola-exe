import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Deployed at https://zprice13.github.io/hola-exe/
  base: '/hola-exe/',
})
