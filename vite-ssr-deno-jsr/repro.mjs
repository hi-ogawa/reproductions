import { createServer } from "vite";
import deno from "@deno/vite-plugin";

const server = await createServer({
  configFile: false,
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    deno(),
    // {
    //   name: 'repro',
    //   resolveId(source, importer, options) {
    //     if (source === '@std/assert') {
    //       return { id: source, external: true  }
    //     }
    //   }
    // }
  ],
  ssr: {
    // external: ['@std/assert']
  },
});
await server.listen();
await server.ssrLoadModule("/src/entry");
await server.close();
