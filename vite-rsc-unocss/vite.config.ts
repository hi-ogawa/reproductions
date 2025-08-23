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
});
