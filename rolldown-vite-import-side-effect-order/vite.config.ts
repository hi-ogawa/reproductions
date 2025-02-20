import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
  },
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: "./src/main.js",
          output: {
            // inlineDynamicImports: true,
          },
          experimental: {
            // strictExecutionOrder: true,
          },
        },
      },
    },
  },
});
