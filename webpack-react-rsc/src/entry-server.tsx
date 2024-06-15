import ReactServer from "react-server-dom-webpack/server.edge";

export type FlightData = React.ReactNode;

export async function handler(_request: Request) {
	const node = <Page />;
	const stream = ReactServer.renderToReadableStream<FlightData>(
		node,
		createBundlerConfig(),
	);
	return new Response(stream, {
		headers: {
			"content-type": "text/x-component;charset=utf-8",
		},
	});
}

function Page() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Webpack React SSR</title>
				<link rel="icon" href="/favicon.ico" />
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
