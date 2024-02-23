import * as vite from "vite";

const server = await vite.createServer({
  server: {
    preTransformRequests: false,
  },
});
console.log(await server.transformRequest("/dir2/file.js"));
