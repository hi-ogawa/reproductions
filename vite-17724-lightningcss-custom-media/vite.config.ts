import { defineConfig } from "vite";

export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  },
  plugins: [
    {
      name: "css-additional-data",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".css")) {
          return `@import "/src/custom-media.css";` + code;
        }
      },
    },
  ],
});
