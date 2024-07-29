import type { IncomingMessage, OutgoingMessage } from "node:http";
import { Readable } from "node:stream";
import { renderToReadableStream } from "hono/jsx/dom/server";
import { App } from "./app";

export default async function handler(
	_req: IncomingMessage,
	res: OutgoingMessage,
) {
	const htmlStream = await renderToReadableStream(<Root />);
	res.setHeader("content-type", "text/html");
	Readable.fromWeb(htmlStream as any).pipe(res);
}

function Root() {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<title>test</title>
				<script type="module" src="/@vite/client" />
			</head>
			<body>
				<div id="root">
					<App />
				</div>
				<script type="module" src="/src/entry-client.tsx" />
			</body>
		</html>
	);
}
