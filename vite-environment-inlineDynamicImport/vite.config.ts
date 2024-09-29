import { defineConfig } from "vite";

export default defineConfig((_env) => ({
  clearScreen: false,
  environments: {
    custom: {
      webCompatible: true,
      build: {
        minify: false,
        rollupOptions: {
          input: {
            "index": "./src/entry.js",
          },
          output: {
            // need to set explicitly
            // inlineDynamicImports: false,
          }
        }
      }
    },
  },

  builder: {
    async buildApp(builder) {
      await builder.build(builder.environments["custom"]!);
    },
  },
}));
