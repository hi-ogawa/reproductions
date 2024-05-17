import type http from "node:http";
import { Readable } from "node:stream";
import ReactDOMServer from "react-dom/server.edge";
import type { StreamData } from "./entry-server";
import { $__global } from "./global";
import { createMemoImport } from "./runtime-client";

export default async function handler(
	_req: http.IncomingMessage,
	res: http.ServerResponse,
) {
	const reactServer = await importReactServer();
	const flightStream = await reactServer.handler();

	(globalThis as any).__webpack_require__ = createMemoImport();
	const { default: ReactClient } = await import(
		"react-server-dom-webpack/client.edge"
	);
	const node = await ReactClient.createFromReadableStream<StreamData>(
		flightStream,
		{
			ssrManifest: {},
		},
	);
	const ssrStream = await ReactDOMServer.renderToReadableStream(node, {
		bootstrapModules: ["/@vite/client", "/src/entry-browser"],
	});
	res.setHeader("content-type", "text/html;charset=utf-8");
	Readable.fromWeb(ssrStream as any).pipe(res);
}

async function importReactServer(): Promise<typeof import("./entry-server")> {
	return $__global.reactServer.ssrLoadModule("/src/entry-server") as any;
}
