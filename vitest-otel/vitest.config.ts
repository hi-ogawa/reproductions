import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    experimental: {
      openTelemetry: {
        // or use CLI flag --experimental.openTelemetry.enabled=true
        enabled: true,
        sdkPath: "./otel.js",
      },
    },
    browser: {
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
