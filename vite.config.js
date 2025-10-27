import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change back to root for Firebase
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})