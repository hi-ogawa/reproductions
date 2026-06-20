import { readFileSync } from "fs";
import { createServer } from "vite";

async function main() {
  const count = process.argv[2] ?? 20_000;

  const server = await createServer({
    configFile: false,
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
    server: {
      middlewareMode: true,
    },
  });
  await server.pluginContainer.buildStart({});

  const { dependencies } = JSON.parse(readFileSync("./package.json", "utf-8"));
  for (const id in dependencies) {
    for (let i = 0; i < count; i++) {
      await server.pluginContainer.resolveId(id);
    }
  }
  await server.close();
}

main();
