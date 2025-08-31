import rsc from "@vitejs/plugin-rsc";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
      },
    }),
    rsc({
      entries: {
        ssr: "./src/framework/entry.ssr.tsx",
        client: "./src/framework/entry.browser.tsx",
      },
      serverHandler: false,
      loadModuleDevProxy: true,
    }),
    {
      name: "rsc-cloudalre",
      config(_config, env) {
        return {
          environments: {
            rsc: {
              optimizeDeps: {
                entries: ["./src/framework/entry.rsc.tsx"],
              },
            },
            ssr: {
              keepProcessEnv: false,
              resolve: {
                noExternal: env.command === "build" ? true : undefined,
              },
              build: {
                outDir: "dist/rsc/ssr",
              },
            },
          },
        };
      },
    },
  ],
});
