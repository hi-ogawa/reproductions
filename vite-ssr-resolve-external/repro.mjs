import { createServer } from "vite";
import path from "node:path"

const server = await createServer({
  configFile: false,
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    {
      name: 'repro',
      resolveId(source, importer, options) {
        if (source === 'my-external') {
          const id = path.resolve('./src/my-external.cjs')
          return { id, external: true }
        }
      }
    }
  ],
});
await server.listen();

await server.ssrLoadModule("/src/entry");

await server.close();
