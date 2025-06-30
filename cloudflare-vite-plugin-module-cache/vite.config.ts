import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
	plugins: [
		cloudflare({
				viteEnvironment: {
					name: 'ssr'
				},
		}),
		{
			name: 'repro',
			async transform(code, id, options) {
				if (id.endsWith("/entry.js")) {
					console.log("[main] slow transform...")
					await new Promise(resolve => setTimeout(resolve, 2000));
					console.log("[main] slow transform... done!")
				}
			},
		}
	],
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr)
		},
	},
});
