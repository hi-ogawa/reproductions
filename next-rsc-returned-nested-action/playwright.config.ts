import { defineConfig } from '@playwright/test'

const bundler = process.env.NEXT_BUNDLER === 'webpack' ? ' --webpack' : ''
const command =
  process.env.NEXT_MODE === 'start'
    ? 'pnpm exec next start --port 3210'
    : `pnpm dev${bundler} --port 3210`

export default defineConfig({
  use: { headless: true },
  webServer: {
    command,
    port: 3210,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
