import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["oxc-parser", "@oxc-parser/binding-wasm32-wasi"],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  resolve: {
    // requires when testing linked package of oxc/napi/parser
    alias: {
      "oxc-parser": "oxc-parser/wasm.js",
    },
    dedupe: ["@oxc-parser/binding-wasm32-wasi"],
  },
  plugins: [
    {
      name: "wasi-workaround",
      enforce: "pre",
      transform(code, id) {
        // TODO: Vite bug? sometimes, the request with `?import&url` fails as Vite responds wasm binary.
        //   node_modules/@oxc-parser/binding-wasm32-wasi/parser.wasm32-wasi.wasm?import&url
        // Using `new URL(...)` seems to work more consistently.
        if (
          id.includes("@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js")
        ) {
          return code.replace(
            `import __wasmUrl from './parser.wasm32-wasi.wasm?url'`,
            `const __wasmUrl = new URL("./parser.wasm32-wasi.wasm", import.meta.url);`,
          );
        }
      },
    },
  ],
  build: {
    // napi-rs wasi-browser.js output relies on top-level await
    target: "es2022",
  },
});
