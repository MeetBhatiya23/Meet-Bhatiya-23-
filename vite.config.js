import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Change to your desired port (e.g., 3000, 8080, etc.)
    open: true, // Optional: Automatically open the app in the browser
  },
})
