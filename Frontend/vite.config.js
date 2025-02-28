import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Allow access from external networks (like ngrok)
    port: 5173,
    strictPort: true,
    allowedHosts: ['939d-45-120-122-178.ngrok-free.app'], // Add your ngrok URL here
    proxy: {
      '/api': {
        target: 'https://matchupx-1.onrender.com', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
