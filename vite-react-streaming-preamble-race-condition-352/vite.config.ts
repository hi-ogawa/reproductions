import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		entries: ["./src/entry-client.tsx"],
	},
	plugins: [
		react(),
		{
			name: "ssr-middleware",
			configureServer(server) {
				return () => {
					server.middlewares.use(async (req, res, next) => {
						try {
							const mod = await server.ssrLoadModule("/src/entry-server");
							await mod.default(req, res);
						} catch (e) {
							next(e);
						}
					});
				};
			},
		},
	],
});
