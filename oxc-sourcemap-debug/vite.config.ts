import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { transform } from "rolldown/experimental";
import * as esbuild from "esbuild";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "dev-server",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? "/", "http://localhost");
          if (url.pathname === "/api/transform") {
            try {
              const result = await apiHandler(url);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } catch (e) {
              res.statusCode = 500;
              res.end(e instanceof Error ? e.message : "Unknown error");
            }
            return;
          }
          next();
        });
      },
    },
  ],
});

async function apiHandler(url: URL) {
  const input = url.searchParams.get("input")!;
  const resultOxc = transform("test.js", input, {
    sourceType: "module",
    lang: "tsx",
    sourcemap: true,
  });
  const resultEsbuild = await esbuild.transform(input, {
    format: "esm",
    loader: "tsx",
    sourcemap: true,
  });
  return { oxc: resultOxc, esbuild: resultEsbuild };
}

export type ApiResult = Awaited<ReturnType<typeof apiHandler>>;
