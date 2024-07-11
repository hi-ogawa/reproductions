import exports from "./index.js";

// @ts-ignore
Deno.serve({ port: 5173 }, exports.fetch);

// deno run --allow-net index-deno.js
