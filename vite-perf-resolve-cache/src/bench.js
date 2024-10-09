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
    server: {
      preTransformRequests: false,
    },
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  });

  await server.transformRequest("/src/entry");
  for (let i = 0; i < 10; i++) {
    server.moduleGraph.invalidateAll();
    await server.transformRequest("/src/entry");
  }
  await server.close();
}

main();
