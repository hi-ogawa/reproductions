import rsc from "@vitejs/plugin-rsc";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "fix-dev-font-flush",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url || "", "http://localhost");
          if (url.pathname.endsWith(".woff2")) {
            res.setHeader("cache-control", "max-age=10");
          }
          next();
        });
      },
    },

    rsc(),
    react(),
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
