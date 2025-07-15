import { createRequestListener } from "@mjackson/node-fetch-server";
import * as http from "node:http";
import { handler } from "./handler.js";

function main() {
  let server = http.createServer(createRequestListener(handler));

  server.listen(3000);
  console.log("Server http://localhost:3000");
}

main();
