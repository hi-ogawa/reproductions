import { createServer } from "vite";

const server = await createServer({
	configFile: false,
});
await server.pluginContainer.buildStart({});

const mod = await server.ssrLoadModule("/file-2.js");
console.log(mod);

await server.close();
