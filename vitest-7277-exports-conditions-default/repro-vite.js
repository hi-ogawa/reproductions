import { defaultServerConditions } from "vite";
import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
    envFile: false,
    ssr: {
      resolve: {
        // conditions: ['custom', ...defaultServerConditions]
      }
    }
  });
  await server.ssrLoadModule("./repro.js")
  await server.close();
}

main()
