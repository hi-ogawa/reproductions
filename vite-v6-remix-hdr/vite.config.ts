import { defineConfig } from "vite";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		entries: ["./src/entry-client.tsx"],
	},
	plugins: [
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
