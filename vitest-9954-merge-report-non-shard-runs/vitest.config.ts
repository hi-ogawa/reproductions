import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: process.env.TEST_NAME,
  },
  plugins: [
    {
      name: "non-shard-merger",
      enforce: "pre",
      config() {
        if (process.env.MERGE_TEST_NAMES) {
          const names: string[] = JSON.parse(process.env.MERGE_TEST_NAMES);
          return {
            test: {
              projects: names.map((name) => ({
                extends: true,
                test: {
                  name,
                },
              })),
            },
          };
        }
      },
    },
  ],
});
