import * as vite from "vite";

const server = await vite.createServer({
  server: {
    // make DEBUG=vite:resolve-details easier to see
    preTransformRequests: false,
  },
});

console.log(`!!!!!! transformRequest("/dir2/file.js", { ssr: true })`);
const transformed = await server.transformRequest("/dir2/file.js", {
  ssr: true,
});
console.log(transformed);

console.log(`!!!!!! ssrLoadModule("/dir2/file.js")`);
await server.ssrLoadModule("/dir2/file.js");
await server.close();
