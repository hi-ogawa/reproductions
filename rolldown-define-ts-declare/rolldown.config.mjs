import { defineConfig } from "rolldown";
import { transformPlugin } from "rolldown/experimental";

export default defineConfig({
	input: ["./src/test.ts", "./src/test-declare.ts"],
	define: {
		__TEST_DEFINE__: `"ok"`,
	},
	plugins: [
		// NOTE: it works with builtin transformPlugin as it strips declare separately?
		// transformPlugin(),
	],
});
