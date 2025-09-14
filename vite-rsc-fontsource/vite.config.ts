import rsc from "@vitejs/plugin-rsc";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { FontaineTransform } from "fontaine";

export default defineConfig({
  plugins: [
    rsc(),
    react(),
    FontaineTransform.vite({
      fallbacks: [
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Roboto",
        "Noto Sans",
      ],
    }),
    {
      name: "simulate-fallback",
      apply: () => !!process.env.TEST_FALLBACK,
      configureServer(server) {
        server.middlewares.use(async (req, _res, next) => {
          if (req.url?.endsWith(".woff2")) {
            await new Promise((r) => setTimeout(r, 1000));
          }
          next();
        });
      },
    },
  ],

  environments: {
    rsc: {
      build: {
        rollupOptions: {
          input: {
            index: "./src/framework/entry.rsc.tsx",
          },
        },
      },
    },

    ssr: {
      build: {
        rollupOptions: {
          input: {
            index: "./src/framework/entry.ssr.tsx",
          },
        },
      },
    },

    client: {
      build: {
        rollupOptions: {
          input: {
            index: "./src/framework/entry.browser.tsx",
          },
        },
      },
    },
  },
});
