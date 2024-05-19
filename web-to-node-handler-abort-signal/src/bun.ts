import { handler } from "./handler.ts";

// @ts-ignore
Bun.serve({ port: 5173, fetch: handler });
console.log("Listening on http://localhost:5173/");
