import { defineConfig } from '@playwright/test'

const port = Number(process.env.PORT ?? 3101)

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: process.env.SERVER_COMMAND ?? `pnpm dev -p ${port}`,
    port,
    reuseExistingServer: false,
  },
  use: {
    baseURL: `http://localhost:${port}`,
  },
})
