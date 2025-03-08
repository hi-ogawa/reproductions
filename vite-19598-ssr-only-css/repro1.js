import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
    plugins: [
      {
        name: 'repro',
        async buildStart() {
          console.log('[repro:buildStart:in]');
          await new Promise((r) => setTimeout(r, 500));
          console.log('[repro:buildStart:out]');
        },
        transform(_code, id) {
          console.log('[repro:transform]', id);
        },
      },
    ]
  });
  await server.pluginContainer.buildStart({})
  await server.ssrLoadModule("./src/empty.js");

  await server.close();
}

main()
