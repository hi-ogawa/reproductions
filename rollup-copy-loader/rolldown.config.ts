import { defineConfig, type Plugin } from "rolldown";
import path from "node:path";
import fs from "node:fs";

export default defineConfig({
  input: ["./src/entry.js"],
  output: {
    dir: "dist",
    format: "esm",
  },
  moduleTypes: {
    svg: "js",
  },
  plugins: [
    {
      name: "copy-loader-svg",
      resolveId: {
        filter: /\.svg$/,
        async handler(source, importer, extraOptions) {
          if (!source.endsWith(".svg")) return;

          const resolved = await this.resolve(source, importer, extraOptions);
          if (resolved) {
            const referenceId = this.emitFile({
              type: "asset",
              name: path.basename(resolved.id),
              source: fs.readFileSync(resolved.id),
            });
            return {
              id: "__copy_placeholder__:" + referenceId,
              external: true,
            };
          }
        },
      },
      renderChunk(code, chunk) {
        if (code.includes("__copy_placeholder__:")) {
          return code.replace(/__copy_placeholder__:(\w+)/g, (_match, id) => {
            const assetFile = this.getFileName(id);
            const relative = path.relative(
              path.join(chunk.fileName, ".."),
              assetFile,
            );
            return "./" + relative;
          });
        }
      },
    },
  ],
});
