import type http from "node:http";
import ReactDOMServer from "react-dom/server.edge";
import type { StreamData } from "./entry-server";
import { $__global } from "./global";
import { createMemoImport } from "./runtime-client";

export default async function handler(
	_req: http.IncomingMessage,
	res: http.ServerResponse,
) {
	// react server (react node -> flight)
	const reactServer = await importReactServer();
	const flightStream = await reactServer.handler();
	const [flightStream1, flightStream2] = flightStream.tee();

	// react client (flight -> react node)
	(globalThis as any).__webpack_require__ = createMemoImport();
	const { default: ReactClient } = await import(
		"react-server-dom-webpack/client.edge"
	);
	const node = await ReactClient.createFromReadableStream<StreamData>(
		flightStream1,
		{
			ssrManifest: {},
		},
	);

	// react dom ssr (react node -> html)
	const ssrStream = await ReactDOMServer.renderToReadableStream(node, {
		bootstrapModules: ["/@vite/client", "/src/entry-browser"],
	});

	// simplify streaming
	let ssrString = await streamToString(ssrStream);
	const flightString = await streamToString(flightStream2);
	ssrString = ssrString.replace(
		"<head>",
		() => `<head>
<script>
	self.__flightStreamScript = new ReadableStream({
		start(ctrl) {
			ctrl.enqueue(${JSON.stringify(flightString)});
			ctrl.close();
		}
	}).pipeThrough(new TextEncoderStream());
</script>
`,
	);
	res.setHeader("content-type", "text/html;charset=utf-8").end(ssrString);
}

async function streamToString(stream: ReadableStream<Uint8Array>) {
	let result = "";
	await stream.pipeThrough(new TextDecoderStream()).pipeTo(
		new WritableStream({
			write(chunk) {
				result += chunk;
			},
		}),
	);
	return result;
}

async function importReactServer(): Promise<typeof import("./entry-server")> {
	return $__global.reactServer.ssrLoadModule("/src/entry-server") as any;
}
