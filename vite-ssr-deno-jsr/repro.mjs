import { createServer } from "vite";

const server = await createServer({
  configFile: false,
  ssr: {
    external: ["jsr:@std/assert@^1.0.0"],
  },
});
await server.listen();
await server.ssrLoadModule("/src/entry");
await server.close();
