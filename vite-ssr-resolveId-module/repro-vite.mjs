import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
});
await server.pluginContainer.buildStart({});

switch (process.argv[2]) {
	case "ssrLoadModule": {
		await server.ssrLoadModule("/repro-entry");
		break;
	}
	case "ssrLoadModule-direct": {
		await server.ssrLoadModule("test-dep");
		break;
	}
	case "resolveId": {
		const resolved = await server.pluginContainer.resolveId(
			"test-dep",
			undefined,
			{
				ssr: true,
			},
		);
		console.log(resolved);
		break;
	}
}

await server.close();
