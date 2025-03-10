import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
  });
  await server.pluginContainer.buildStart({});
  const mod = await server.ssrLoadModule("./src/test.js");
  console.log(mod);
  await server.close();
}

main()
