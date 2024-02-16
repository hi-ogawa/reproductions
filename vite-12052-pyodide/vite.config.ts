import { defineConfig } from "vite";
import fs from "node:fs";

export default defineConfig({
  clearScreen: false,
  plugins: [
    {
      name: "copy-pyodide",
      async buildStart(_options) {
        // TODO: prefetch in index.html?
        const srcDir = "node_modules/pyodide/";
        const dstDir = "public/assets/pyodide/0.25.0/";
        const files = [
          "pyodide.asm.wasm",
          "python_stdlib.zip",
          "pyodide-lock.json",
          "pyodide.asm.js",
          "pyodide.js",
        ];
        await fs.promises.mkdir(dstDir, { recursive: true });
        for (const file of files) {
          await fs.promises.copyFile(srcDir + file, dstDir + file);
        }
      },
    },
  ],
});
