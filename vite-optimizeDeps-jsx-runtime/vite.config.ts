import { defineConfig } from "vite";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		esbuildOptions: process.env["FIX_esbuildOptions"]
			? {
					// we need to explicitly set jsx transform
					// since esbuild transform during scan doesn't pick up user' tsconfig.json
					// cf. https://github.com/vitejs/vite/blob/f71ba5b94a6e862460a96c7bf5e16d8ae66f9fe7/packages/vite/src/node/optimizer/scan.ts#L226
					jsx: "automatic",
					jsxDev: true,
					jsxImportSource: "vue",
				}
			: undefined,
		// or users can simply add this
		// include: ["vue/jsx-dev-runtime"]
	},
});
