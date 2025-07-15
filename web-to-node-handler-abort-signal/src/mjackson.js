import { createRequestListener } from "@mjackson/node-fetch-server";
import http from "node:http";
import { handler } from "./handler.js";

const server = http.createServer(createRequestListener(handler));
server.listen(3000);
console.log("server http://localhost:3000");
