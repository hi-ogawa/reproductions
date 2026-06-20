import { fileURLToPath } from "node:url";
import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
    clearScreen: false,
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  });
  await server.listen();
  const fileUrl = new URL("./src/entry.js", import.meta.url);
  console.log(await server.ssrLoadModule(fileURLToPath(fileUrl)));
  await server.close();
}

main();
