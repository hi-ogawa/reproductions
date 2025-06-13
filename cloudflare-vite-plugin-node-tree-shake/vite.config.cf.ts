import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
	plugins: [
		cloudflare({
				viteEnvironment: {
					name: 'ssr'
				},
		}),
	],
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr)
		},
	},
});
