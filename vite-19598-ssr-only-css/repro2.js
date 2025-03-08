import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
  });
  await server.ssrLoadModule("./src/import-css.js");
  await server.close();
}

main()
