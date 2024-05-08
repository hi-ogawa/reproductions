import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	server: {
		preTransformRequests: false,
	},
});
await server.pluginContainer.buildStart({});

if (process.argv[2] === "reverse") {
	console.log("######");
	console.log("###### server.pluginContainer.resolveId");
	console.log("######");
	console.log(
		await server.pluginContainer.resolveId("@emotion/react", undefined, {
			ssr: true,
		}),
	);

	console.log("######");
	console.log("###### server.ssrLoadModule");
	console.log("######");
	await server.ssrLoadModule("/repro-node.mjs");

} else {
	console.log("######");
	console.log("###### server.ssrLoadModule");
	console.log("######");
	await server.ssrLoadModule("/repro-node.mjs");

	console.log("######");
	console.log("###### server.pluginContainer.resolveId");
	console.log("######");
	console.log(
		await server.pluginContainer.resolveId("@emotion/react", undefined, {
			ssr: true,
		}),
	);
}

await server.close();
