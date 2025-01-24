import { createServer } from "vite";
import fs from "node:fs";

async function main() {
  const server = await createServer({
    configFile: false,
    envFile: false,
    plugins: [
      {
        name: "repro",
        resolveId(source) {
          if (source === "virtual:entry") {
            return "\0" + source;
          }
        },
        load(id) {
          if (id === "\0virtual:entry") {
            return `\
import hello from "/src/hello.js";
console.log(">>> importing 'virtual:entry'", { hello })
`;
          }
        },
      },
    ],
  });

  await server.environments.ssr.runner.import("virtual:entry");
  // await server.ssrLoadModule("virtual:entry"); // no error log if ssrLoadModule

  await new Promise((r) => setTimeout(r, 1000));
  console.log(">>> editing 'src/hello.js'");
  fs.writeFileSync("src/hello.js", `export default "hello-${Date.now()}"\n`);

  await new Promise((r) => setTimeout(r, 1000));
  await server.environments.ssr.runner.import("virtual:entry");
  // await server.ssrLoadModule("virtual:entry");

  await server.close();
}

main();
