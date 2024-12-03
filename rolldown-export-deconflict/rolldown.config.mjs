import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/main1.js", "./src/main2.js"],
	// output: {
	// 	advancedChunks: {
	// 		groups: [
	// 			{ name: "lib", test: '/lib/' },
	// 		]
	// 	}
	// },
	// experimental: {
	// 	strictExecutionOrder: true,
	// },
});
