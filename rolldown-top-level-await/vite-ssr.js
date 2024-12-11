import { createServer } from "vite"

async function main() {
  const server = await createServer({ configFile: false });
  await server.ssrLoadModule("./src/entry.js")
  await server.close();
}

main()
