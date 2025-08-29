import { defineConfig } from "waku/config";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [mdx(), tailwindcss()],
  },
});
