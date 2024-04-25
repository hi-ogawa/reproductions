import { createServer } from "vite";

const server = await createServer({
  clearScreen: false,
});
await server.ssrLoadModule("/package.json")
await server.pluginContainer.buildStart({})
await server.close();
