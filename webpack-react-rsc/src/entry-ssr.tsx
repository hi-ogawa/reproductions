import ReactDOMServer from "react-dom/server.edge";
import ReactClient from "react-server-dom-webpack/client.edge";
import type { FlightData } from "./entry-server";

export async function handler(request: Request) {
	const url = new URL(request.url);

	// react server (react node -> flight)
	const entryReactServer = await import("./entry-server-layer");
	const flightStream = await entryReactServer.handler(request);
	if (url.searchParams.has("__f")) {
		return new Response(flightStream, {
			headers: {
				"content-type": "text/x-component;charset=utf-8",
			},
		});
	}

	const [flightStream1, flightStream2] = flightStream.tee();

	// react client (flight -> react node)
	let node = await ReactClient.createFromReadableStream<FlightData>(
		flightStream1,
		{
			ssrManifest: {},
		},
	);

	// send a copy of flight stream together with ssr
	const flightStreamCode = await getFlightStreamCode(flightStream2);
	node = (
		<>
			{node}
			<script dangerouslySetInnerHTML={{ __html: flightStreamCode }} />
		</>
	);

	// react dom ssr (react node -> html)
	const htmlStream = await ReactDOMServer.renderToReadableStream(node, {
		// TODO: hashed prod assets
		bootstrapScripts: __define.DEV ? ["/assets/index.js"] : [],
	});

	return new Response(htmlStream, {
		headers: {
			"content-type": "text/html;charset=utf-8",
		},
	});
}

async function getFlightStreamCode(stream: ReadableStream<Uint8Array>) {
	const flightString = await streamToString(stream);
	return `\
self.__flightStream = new ReadableStream({
	start(ctrl) {
		ctrl.enqueue(${JSON.stringify(flightString)});
		ctrl.close();
	}
}).pipeThrough(new TextEncoderStream());
`;
}

async function streamToString(stream: ReadableStream<Uint8Array>) {
	let s = "";
	await stream.pipeThrough(new TextDecoderStream()).pipeTo(
		new WritableStream({
			write(c) {
				s += c;
			},
		}),
	);
	return s;
}
