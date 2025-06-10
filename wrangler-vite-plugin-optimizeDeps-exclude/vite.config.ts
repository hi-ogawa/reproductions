import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import testDepPlugin from "@vitejs/test-dep/plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			viteEnvironment: {
				name: "ssr",
			},
		}),
		testDepPlugin(),
		// @ts-ignore
		!!process.env.TEST_WORKAROUND && {
			name: "workaround",
			config(config) {
				// same workaround from https://github.com/hi-ogawa/vite-plugins/pull/926
				const plugin = config
					.plugins!.flat()
					.find((p) => p && "name" in p && p.name === "vite-plugin-cloudflare");
				const original = (plugin as any).configResolved;
				(plugin as any).configResolved = function (this: any, ...args: any[]) {
					try {
						return original.apply(this, args);
					} catch (e) {
						console.log(
							"[patched cloudflare plugin error]",
							e instanceof Error ? e.message : e,
						);
					}
				};
			},
		},
	],
	environments: {
		ssr: {
			optimizeDeps: {
				exclude: ["@vitejs/test-dep"],
			},
		},
	},
});
