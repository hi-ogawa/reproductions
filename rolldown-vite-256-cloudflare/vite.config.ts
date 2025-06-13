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
	environments: {
		ssr: {
			build: {
				rollupOptions: {
					experimental: {
						strictExecutionOrder: true,
					},
					// this fixes it (cf. https://github.com/vitejs/rolldown-vite/issues/248)
					// platform: 'neutral',
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
