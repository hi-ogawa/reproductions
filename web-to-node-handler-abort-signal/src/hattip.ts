import { createMiddleware } from "@hattip/adapter-node/native-fetch";
import { handler } from "./handler";

export default createMiddleware((ctx) => handler(ctx.request));
