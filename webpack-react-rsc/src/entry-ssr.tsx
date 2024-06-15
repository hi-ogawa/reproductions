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

	// react client (flight -> react node)
	const node = await ReactClient.createFromReadableStream<FlightData>(
		flightStream,
		{
			ssrManifest: {},
		},
	);

	// react dom ssr (react node -> html)
	const htmlStream = await ReactDOMServer.renderToReadableStream(node);
	return new Response(htmlStream, {
		headers: {
			"content-type": "text/html;charset=utf-8",
		},
	});
}
