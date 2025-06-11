import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
	plugins: [
		cloudflare({
				viteEnvironment: {
					name: 'ssr'
				}
		})
	],
	environments: {
		ssr: {
			build: {
				rollupOptions: {
					// probably we should suggest this?
					// platform: "neutral",
				}
			}
		}
	},
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr)
		},
	},
});
