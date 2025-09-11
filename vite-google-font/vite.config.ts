import rsc from "@vitejs/plugin-rsc";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { googleFontPlugin } from "./utils";

export default defineConfig({
  plugins: [
    googleFontPlugin({
      fonts: [
        "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      ],
      subset: ["latin"],
    }),
    rsc(),
    react(),
  ],

  environments: {
    rsc: {
      build: {
        cssMinify: false,
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
