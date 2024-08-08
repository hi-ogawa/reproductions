import { defineConfig } from "vite";
import { vitePluginPreBundleNewUrl } from "@hiogawa/vite-plugin-pre-bundle-new-url";

export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    vitePluginPreBundleNewUrl({
      debug: true,
    }),
  ],
  build: {
    minify: false,
  },
});
