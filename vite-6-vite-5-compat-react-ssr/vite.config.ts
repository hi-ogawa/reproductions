import {
	type Connect,
	type Plugin,
	type PluginOption,
	defineConfig,
} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig((_env) => ({
	clearScreen: false,
	appType: "custom",
	plugins: [
		react(),
		vitePluginSsrMiddleware({
			entry: "/src/entry-server",
		}),
		{
			name: "global-server",
			configureServer(server) {
				Object.assign(globalThis, { $__vite_server: server });
			},
		},
	],
}));

function vitePluginSsrMiddleware({
	entry,
}: {
	entry: string;
}): PluginOption {
	const plugin: Plugin = {
		name: vitePluginSsrMiddleware.name,
		configureServer(server) {
			const handler: Connect.NextHandleFunction = async (req, res, next) => {
				try {
					const mod = await server.ssrLoadModule(entry);
					await mod["default"](req, res, next);
				} catch (e) {
					next(e);
				}
			};
			return () => server.middlewares.use(handler);
		},
	};
	return [plugin];
}
