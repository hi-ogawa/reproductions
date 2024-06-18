import { defineConfig } from "vitest/config";

export default defineConfig({
	ssr: {
		// [OK]
		// noExternal: ["@test-pkg/pkg"],

		// [OK] repro-vite-ssr.js
		// [NOT OK] vitest
		noExternal: ["@test-pkg/**"],
	},
	test: {
		server: {
			deps: {
				// [OK]
				// inline: ["@test-pkg/pkg"]
				// [NOT OK] vitest
				// inline: ["@test-pkg/**"]
			},
		},
	},
});
