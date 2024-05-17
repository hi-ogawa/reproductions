import { createServer, defineConfig } from "vite";
import { $__global } from "./src/global";

export default defineConfig((_env) => ({
	clearScreen: false,
	optimizeDeps: {
		entries: [],
	},
	plugins: [
		{
			name: "react-server",
			configureServer(server) {
				return () => {
					server.middlewares.use(async (req, res, next) => {
						const mod = await server.ssrLoadModule("/src/entry-ssr");
						try {
							await mod.default(req, res);
						} catch (e) {
							next(e);
						}
					});
				};
			},
			async buildStart() {
				$__global.reactServer = await createServer({
					configFile: false,
					cacheDir: "node_modules/.vite-react-server",
					optimizeDeps: {
						entries: [],
					},
					ssr: {
						resolve: {
							conditions: ["react-server"],
						},
						noExternal: true,
						optimizeDeps: {
							include: [
								"react",
								"react/jsx-runtime",
								"react/jsx-dev-runtime",
								"react-server-dom-webpack/server.edge",
							],
						},
					},
					plugins: [
						{
							name: "client-reference",
							transform(code, id, _options) {
								if (/^(("use client")|('use client'))/.test(code)) {
									const matches = code.matchAll(/export function (\w+)\(/g);
									const result = [
										`import { registerClientReference as $$register } from "/src/runtime-server"`,
										...[...matches].map(
											([, name]) =>
												`export const ${name} = $$register("${id}", "${name}")`,
										),
									].join(";\n");
									return { code: result, map: null };
								}
							},
						},
					],
				});
			},
			async buildEnd() {
				await $__global.reactServer?.close();
			},
		},
	],
}));
