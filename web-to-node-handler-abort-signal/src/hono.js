import { serve } from "@hono/node-server";
import { handler } from "./handler.js";

serve({ fetch: handler, port: 3000 });
console.log("server http://localhost:3000");
