import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    experimental: {
      openTelemetry: {
        // or use CLI flag --experimental.openTelemetry.enabled=true
        enabled: true,
        sdkPath: "./otel.js",
      },
    },
  },
});
