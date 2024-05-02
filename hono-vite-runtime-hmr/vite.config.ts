import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";

export default defineConfig(() => ({
  clearScreen: false,
  plugins: [
    react(),
    devServer({
      entry: "./src/entry-ssr",
      injectClientScript: false,
    }),
    {
      name: "global-vite-server",
      configureServer(server) {
        (globalThis as any).__viteServer = server;
      },
    },
  ],
}));
