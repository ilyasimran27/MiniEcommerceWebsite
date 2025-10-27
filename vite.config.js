import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MiniEcommerceWebsite/', // This is correct
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})