import rsc from "@vitejs/plugin-rsc";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
// import inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [
    unocss(),
    rsc({
      entries: {
        rsc: "./src/framework/entry.rsc.tsx",
        ssr: "./src/framework/entry.ssr.tsx",
        client: "./src/framework/entry.browser.tsx",
      },
    }),
    react(),
    // inspect(),
  ],
  build: {
    // https://github.com/unocss/unocss/blob/1bcc90169a024b53844910f0df1bc5929fb8210b/packages-integrations/vite/src/modes/global/build.ts#L128
    // workaround since unocss doesn't check per-environment `outDir`.
    // otherwise build style breaks with
    // > [plugin unocss:global:build:generate] [unocss] failed to find vite:css-post plugin. It might be an internal bug of UnoCSS
    outDir: "dist/rsc",
  },
});
