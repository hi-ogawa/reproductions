import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as oxc from "oxc-transform";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "dev-server",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? "/", "http://localhost");
          if (url.pathname === "/api/oxc") {
            const input = url.searchParams.get("input")!;
            const result = oxc.transform("test.js", input, {
              sourceType: "module",
              lang: "tsx",
              sourcemap: true,
            });
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
            return;
          }
          next();
        });
      },
    },
  ],
});
