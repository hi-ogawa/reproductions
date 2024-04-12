import { createServer } from "vite";

const server = await createServer({
  configFile: false,
  optimizeDeps: {
    force: true,
    noDiscovery: true,
  },
  ssr: {
    noExternal: true,
    optimizeDeps: {
      // (ok)
      // include: ["@remix-run/server-runtime"],

      // (not ok)
      include: ["@remix-run/server-runtime > cookie"],
    },
  },
});

try {
  const mod = await server.ssrLoadModule("/repro-entry.ts");
  mod.main();
} catch (e) {
  console.error(e);
} finally {
  await server.close();
}
