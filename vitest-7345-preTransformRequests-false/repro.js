import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
    envFile: false,
    server: process.env.preTransformRequests
      ? {
          preTransformRequests: process.env.preTransformRequests === "true",
        }
      : {},
    plugins: [
      {
        name: "repro",
        transform(_code, id) {
          console.log("[transform]", id.split("/").at(-1));
        },
      },
    ],
  });

  if (process.env.ssr === "true") {
    console.log(`>>> transformRequest("/src/entry.js", { ssr: true })`);
    await server.transformRequest("/src/entry.js", { ssr: true });
  } else {
    console.log(`>>> transformRequest("/src/entry.js")`);
    await server.transformRequest("/src/entry.js");
  }
}

main();
