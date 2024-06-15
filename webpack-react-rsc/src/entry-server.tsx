import React from "react";
import ReactServer from "react-server-dom-webpack/server.edge";
import Page from "./routes/page";

export type FlightData = React.ReactNode;

export async function handler(request: Request) {
	// react server (react node -> flight)
	const url = new URL(request.url);
	const node = <Page />;
	const flightStream = ReactServer.renderToReadableStream<FlightData>(
		node,
		createBundlerConfig(),
	);
	if (url.searchParams.has("__f")) {
		return new Response(flightStream, {
			headers: {
				"content-type": "text/x-component;charset=utf-8",
			},
		});
	}

	// delegate to ssr
	const entrySsr = await import("./entry-ssr-layer");
	return entrySsr.handler(flightStream);
}

function createBundlerConfig() {
	return new Proxy(
		{},
		{
			get(_target, p: string, _receiver) {
				const [id, name] = p.split("#");
				return { id, name, chunks: [] };
			},
		},
	);
}
