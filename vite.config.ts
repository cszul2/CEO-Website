/** @fileoverview Configures the React build, development server, and local API proxy. */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Configures the React development server and forwards API requests to the local backend. */
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
