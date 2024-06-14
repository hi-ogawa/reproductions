import path from "node:path";
import { webToNodeHandler } from "@hiogawa/utils-node";
import { defineConfig } from "vite";

// borrow vite preview server

export default defineConfig({
	plugins: [
		{
			name: "preview-middleware",
			async configurePreviewServer(server) {
				const mod = await import(path.resolve("./dist/server.cjs"));
				return () => {
					server.middlewares.use(webToNodeHandler(mod.handler));
				};
			},
		},
	],
});
