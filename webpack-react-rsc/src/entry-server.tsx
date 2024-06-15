import React from "react";
import ReactServer from "react-server-dom-webpack/server.edge";

export type FlightData = React.ReactNode;

export async function handler(request: Request) {
	const url = new URL(request.url);
	// TODO: jsx transform is broken?
	Page;
	// const node = <div>hello</div>;
	const node = React.createElement("div", null, "hello");
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

	// https://webpack.js.org/api/module-methods/#magic-comments
	const entrySsr: typeof import("./entry-ssr") = await import(
		/* webpackIgnore: true */ "./ssr.cjs" as string
	);

	// TODO: this doesn't trigger a separate layer?
	// import("./entry-ssr");

	return entrySsr.handler(flightStream);
}

function Page() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Webpack RSC</title>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</head>
			<body>
				<div>Hello</div>
			</body>
		</html>
	);
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
