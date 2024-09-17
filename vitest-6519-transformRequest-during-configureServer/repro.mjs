import { createServer } from "vite";

async function main() {
  const server = await createServer({
    root: import.meta.dirname,
    configFile: false,
    plugins: [
      {
        name: "debug",
        async configureServer(server) {
          if (process.argv[2] === "1") {
            console.log("//// [transformRequest during configureServer] ////");
            console.log(
              (await server.transformRequest("/repro-importer.ts")).code,
            );
          }
        },
      },
    ],
  });
  if (process.argv[2] === "2") {
    console.log("//// [transformRequest after createServer] ////");
    console.log((await server.transformRequest("/repro-importer.ts")).code);
  }
  await server.close();
}

main();
