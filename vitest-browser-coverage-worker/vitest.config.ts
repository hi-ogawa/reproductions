import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      cleanOnRerun: false,
    },
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
    },
  },
})
