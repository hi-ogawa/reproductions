import type { IncomingMessage, ServerResponse } from "node:http";
import ReactDOMServer from "react-dom/server";
import { App } from "./app";

export default async function handler(
	_req: IncomingMessage,
	res: ServerResponse,
) {
	const htmlStream = ReactDOMServer.renderToPipeableStream(<Root />, {
		bootstrapModules: ["/src/entry-client"],
		onShellReady() {
			res.setHeader("content-type", "text/html");
			htmlStream.pipe(res);
		},
		onShellError() {
			res.statusCode = 500;
			res.setHeader("content-type", "text/html");
			res.end("<h1>Something went wrong</h1>");
		},
	});
}

function Root() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>test</title>
				<script type="module" src="/@vite/client" />
			</head>
			<body>
				<div id="root">
					<App />
				</div>
			</body>
		</html>
	);
}
