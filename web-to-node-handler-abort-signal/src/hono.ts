import { getRequestListener } from "@hono/node-server";
import { handler } from "./handler";

export default getRequestListener(handler);
