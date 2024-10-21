import { build, createServer } from "vite";

async function main() {
  if (process.argv[2] === "dev") {
    const server = await createServer({
      optimizeDeps: {
        noDiscovery: true,
      },
    });
    await server.listen();
    const mod = await server.ssrLoadModule("/src/entry.js");
    console.log(mod.default);
    await server.close();
  } else {
    await build({
      build: {
        ssr: "/src/entry.js",
      },
    });
  }
}

main();
