import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react/jsx-dev-runtime'],
  },
  test: {
    reporters: [['html', { singleFile: true }], ...configDefaults.reporters],
    setupFiles: ['vitest-browser-react'],
    includeTaskLocation: true,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
          viewport: { width: 900, height: 500 },
        },
      ],
      headless: true,
      ui: false,
      traceView: true,
      screenshotFailures: false,
    },
  },
})
