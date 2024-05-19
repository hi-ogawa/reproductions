import { handler } from "./handler.ts";

// @ts-ignore
Deno.serve({ port: 5173 }, handler);
