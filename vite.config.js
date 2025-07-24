import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.', // ✅ project root contains index.html
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html') // ✅ ensures build entry is correct
    }
  }
})
