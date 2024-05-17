import { defineConfig } from "vite";

export default defineConfig({
	clearScreen: false,
	plugins: [
		{
			name: "node-middleware",
			configureServer(server) {
				server.middlewares.use(async (req, res, next) => {
					if (req.originalUrl === "/stream") {
						try {
							const entry = process.env["SERVER_ENTRY"] || "/src/hattip";
							const mod = await server.ssrLoadModule(entry);
							await mod.default(req, res);
						} catch (e) {
							next();
						}
					} else {
						next();
					}
				});
			},
		},
	],
});
