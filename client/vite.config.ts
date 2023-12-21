/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': 'http://localhost:3000/',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      all: true,
      include: ['src/**'],
      provider: 'istanbul',
      reportsDirectory: './html/coverage',
      reporter: ['text', ['html', { subdir: 'coverage' }]],
    },
    reporters: ['default', 'html'],
  },
})
