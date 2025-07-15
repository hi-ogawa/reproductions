import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handler } from "./handler.js";

function main() {
  const app = new Hono();
  app.use(() => {
    return handler();
  });

  serve({ fetch: app.fetch });
}

main();
