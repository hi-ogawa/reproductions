import { defineConfig } from "vite";

export default defineConfig({
	clearScreen: false,
	// ===== workaround =======
	// optimizeDeps: {
	// 	esbuildOptions: {
	// 		jsx: "automatic",
	// 		jsxDev: true,
	// 		jsxImportSource: "vue",
	// 	},
	// 	include: ["vue/jsx-dev-runtime"]
	// },
});
