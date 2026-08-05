import { defineConfig } from '@playwright/test'

const mode = process.env.REPRO_MODE ?? 'dev'

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: mode === 'build' ? 'pnpm start' : 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
  },
})
