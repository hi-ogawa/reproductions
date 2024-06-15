import ReactDOMServer from "react-dom/server.edge";
import ReactClient from "react-server-dom-webpack/client.edge";
import type { FlightData } from "./entry-server";

export async function handler(flightStream: ReadableStream<Uint8Array>) {
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
