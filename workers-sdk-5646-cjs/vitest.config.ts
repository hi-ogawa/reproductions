import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        miniflare: {
          compatibilityDate: "2024-03-14",
          compatibilityFlags: ["nodejs_compat"],
        },
      },
    },
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
          include: ["test-optimized", "semver"],
        }
      }
    }
  },
});
