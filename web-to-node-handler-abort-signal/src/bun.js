import { handler } from "./handler.js";

Bun.serve({ port: 3000, fetch: handler });
console.log("server http://localhost:3000/");
