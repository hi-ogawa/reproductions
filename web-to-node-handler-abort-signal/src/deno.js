import { handler } from "./handler.js";

Deno.serve({ port: 3000 }, handler);
