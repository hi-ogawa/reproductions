import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js"],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  plugins: [
    {
      name: "wasi-workaround",
      enforce: "pre",
      transform(code, id) {
        // TODO: Vite bug? sometimes, the request with `?import&url` fails as Vite respond  wasm binary.
        //   node_modules/@oxc-parser/binding-wasm32-wasi/parser.wasm32-wasi.wasm?import&url
        // Using `new URL(...)` seems to work more consistently.
        if (
          id.includes("@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js")
        ) {
          return code.replace(
            `import __wasmUrl from './parser.wasm32-wasi.wasm?url'`,
            `const __wasmUrl = new URL("./parser.wasm32-wasi.wasm", import.meta.url).href;`,
          );
        }
      },
    },
  ],
});
