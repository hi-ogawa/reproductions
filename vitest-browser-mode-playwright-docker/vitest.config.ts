import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright({
        connectOptions: process.env.REMOTE_PW
          ? {
              wsEndpoint: process.env.REMOTE_PW,
              exposeNetwork: '<loopback>',
            }
          : undefined,
      }),
      instances: [
        {
          browser: "chromium",
        },
        {
          browser: "firefox",
        },
        {
          browser: "webkit",
        },
      ],
    },
  },
});
