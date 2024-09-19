import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "browser",
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright",
      // https://playwright.dev
      providerOptions: {},
      // headless: true,
      // screenshotFailures: false,
    },
  },
});
