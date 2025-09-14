import { defineConfig } from "vite"
import path from "node:path";
import inspect from "vite-plugin-inspect";

let i = 0;

export default defineConfig({
  plugins: [
    inspect(),
    {
      name: 'repro',
      resolveId(id) {
        if (id === 'virtual:test') {
          return "\0" + id
        }
      },
      load(id) {
        if (id === '\0virtual:test') {
          this.addWatchFile(path.resolve("./src/dep1.js"));
          return `export default "ok (load count: ${i++})"`
        }
      },
      configureServer(server) {
        const moduleGraph = server.environments.client!.moduleGraph;
        const original = moduleGraph.invalidateModule
        moduleGraph.invalidateModule = function (...args) {
          console.log('[invalidateModule]', {
            id: args[0].id,
            // @ts-ignore
            softInvalidate: args[4],
          });
          return original.apply(this, args)
        }
      },
    }
  ]
})
