import { createMiddleware } from "@hattip/adapter-node";
import { handler } from "../entry-server";

export default createMiddleware((ctx) => {
	(globalThis as any).__vite_server = (
		ctx.platform.request as any
	).viteDevServer;
	return handler(ctx.request);
});
