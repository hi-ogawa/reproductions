import { createServer } from "vite"

async function main() {
  const server = await createServer({ configFile: false});
  try {
    const mod = await server.ssrLoadModule("./src/test.js");
    mod.test();
  } catch (e) {
    console.log("[e.stack:before]", e.stack)
    server.ssrFixStacktrace(e)
    console.log("[e.stack:after]", e.stack);
  }
  await server.close();
}

main();
