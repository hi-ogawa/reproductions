import http from "node:http";
import assert from "node:assert";
import { Counter } from "./routes/_client";
import type { StreamData } from "./entry-server";
import { Readable } from "node:stream";
import ReactDOMServer from "react-dom/server.edge";

async function handler(_req: http.IncomingMessage, res: http.ServerResponse) {
	(globalThis as any).__webpack_require__ = (_id: string) => {
		return { Counter };
	};
	const { default: ReactClient } = await import(
		"react-server-dom-webpack/client.edge"
	);
	const flightRes = await fetch("http://localhost:3001");
	assert.ok(flightRes.ok);
	assert.ok(flightRes.body);
	const node = await ReactClient.createFromReadableStream<StreamData>(
		flightRes.body,
		{
			ssrManifest: {},
		},
	);
	const ssrStream = await ReactDOMServer.renderToReadableStream(node);
	res.setHeader("content-tyep", "text/html;charset=utf-8");
	Readable.fromWeb(ssrStream as any).pipe(res);
}

async function main() {
	const server = http.createServer(handler);
	server.listen(3002, () => {
		console.log(":: listening at http://localhost:3002");
	});
}

main();
