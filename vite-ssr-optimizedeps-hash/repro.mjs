import { createServer } from "vite";

const server = await createServer({
  clearScreen: false,
  configFile: false,
  optimizeDeps: {
    noDiscovery: true,
  },
  ssr: {
    noExternal: ["cookie", "@hiogawa/utils"],
    optimizeDeps: {
      include: ["cookie"],
    },
  },
});

try {
  const mod = await server.ssrLoadModule("/repro-entry");
  mod.main();
} catch (e) {
  console.error(e);
} finally {
  await server.close();
}
