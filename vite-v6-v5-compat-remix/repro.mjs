import { createServer } from "vite";

const server = await createServer({
	configFile: false,
	plugins: [
		{
			name: "test-virtual",
			resolveId(id) {
				if (id === "virtual:test") {
					return "\0virtual:test";
				}
			},
			load(id) {
				if (id === "\0virtual:test") {
					return `
            globalThis.__virtual_test_state ??= 0;
            globalThis.__virtual_test_state++;
            export default globalThis.__virtual_test_state;
          `;
				}
			},
		},
	],
});

console.log(await server.ssrLoadModule("virtual:test"));
console.log(await server.ssrLoadModule("virtual:test"));
server.moduleGraph.invalidateModule(
	server.moduleGraph.getModuleById("\0virtual:test"),
);
console.log(await server.ssrLoadModule("virtual:test"));

await server.close();
