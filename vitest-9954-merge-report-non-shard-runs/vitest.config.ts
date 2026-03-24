import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: process.env.TEST_NAME,
    projects: process.env.MERGE_TEST_NAMES
      ? JSON.parse(process.env.MERGE_TEST_NAMES).map((name: string) => ({
          extends: true,
          test: {
            name,
          },
        }))
      : undefined,
  },
});
