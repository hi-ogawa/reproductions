import ReactServer from "react-server-dom-webpack/server.edge";
import Page from "./routes/page";
import http from "node:http";
import { Readable } from "node:stream";

export type StreamData = React.ReactNode;

async function handler(_req: http.IncomingMessage, res: http.ServerResponse) {
	const node = <Page />;
	const stream = ReactServer.renderToReadableStream<StreamData>(node, {
		"id#Counter": {
			id: "id",
			name: "Counter",
			chunks: [],
		},
	});
	res.setHeader("content-tyep", "text/x-component;charset=utf-8");
	Readable.fromWeb(stream as any).pipe(res);
}

async function main() {
	const server = http.createServer(handler);
	server.listen(3001, () => {
		console.log(":: listening at http://localhost:3001");
	});
}

main();
