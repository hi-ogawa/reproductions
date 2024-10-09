import { readFileSync } from "fs";
import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
    plugins: [
      {
        name: "repro",
        resolveId() {},
      },
    ],
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  });

  const { dependencies } = JSON.parse(readFileSync("./package.json", "utf-8"));
  for (const id in dependencies) {
    for (let i = 0; i < 10000; i++) {
      await server.pluginContainer.resolveId(id);
    }
  }
  await server.close();
}

main();
