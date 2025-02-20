import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
  },
  environments: {
    ssr: {
      resolve: {
        noExternal: ["use-sync-external-store"],
      },
      build: {
        rollupOptions: {
          input: "./src/main.js",
        },
      },
    },
  },
  plugins: [
    // {
    //   name: "workaround",
    //   apply: "build",
    //   configEnvironment() {
    //     return {
    //       build: {
    //         rollupOptions: {
    //           // prevent `createRequire` injection
    //           platform: "browser",
    //         },
    //       },
    //     };
    //   },
    //   renderChunk(code) {
    //     // replace `__require` with global `require`
    //     return code.replaceAll("__require(", `  require(`);
    //   },
    // },
  ],
});
