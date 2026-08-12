import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const browser = process.env.BENCH_RUNTIME === 'browser'
const coverage = process.env.BENCH_COVERAGE === 'on'

export default defineConfig({
  define: {
    __BENCH_EAGER_STACK__: JSON.stringify(process.env.BENCH_VARIANT === 'eager'),
  },
  test: {
    setupFiles: ['./test/setup.ts'],
    includeTaskLocation: process.env.BENCH_TASK_LOCATION === 'on',
    browser: {
      enabled: browser,
      headless: true,
      ui: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      enabled: coverage,
      provider: 'v8',
      reporter: ['text-summary'],
    },
  },
})
