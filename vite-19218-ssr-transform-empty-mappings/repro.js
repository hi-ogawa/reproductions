import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
    envFile: false,
    plugins: [
      {
        name: 'repro',
        resolveId(source) {
          if (source === 'virtual:repro') {
            return '\0' + source;
          }
        },
        load(id) {
          if (id === '\0virtual:repro') {
            return {
              code: `\
import path from "node:path";
import fs from "node:fs";
export default path;
export { fs };
`,
              map: { mappings: '' }
            }
          }
        }
      }
    ]
  });
  {
    const result = await server.environments.ssr.transformRequest('virtual:repro')
    console.log("[ssr.transformRequest]", result);
  }
  {
    const result = await server.environments.client.transformRequest('virtual:repro')
    console.log("[client.transformRequest]", result);
  }
  await server.close();
}

main()
