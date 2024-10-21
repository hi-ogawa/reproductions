import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig((_env) => ({
  clearScreen: false,
  plugins: [
    {
      name: "repro",
      resolveId(source, importer, options) {
        if (source === "virtual:test-dep") {
          return "\0" + source;
        }
      },
      // using a virtual module to import file url
      load(id, options) {
        if (id === "\0virtual:test-dep") {
          const fileUrl = new URL("./src/dep.js", import.meta.url);
          return `
              import testDep from ${JSON.stringify(fileUrl.href)};
              export default testDep;
            `;
        }
      },
    },
    !!process.env["RESOLVE_FILE_URL"] && {
      name: "resolve-file-url",
      resolveId(source, importer, options) {
        if (source.startsWith("file://")) {
          return fileURLToPath(new URL(source));
        }
      },
    },
  ],
}));
