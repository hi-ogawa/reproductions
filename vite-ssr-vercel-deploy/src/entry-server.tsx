import type http from "node:http";
import ReactDOMServer from "react-dom/server";
import type { ViteDevServer } from "vite";
import { App } from "./app";

declare let __vite_server: ViteDevServer;

export default async function handler(
	req: http.IncomingMessage,
	res: http.ServerResponse,
) {
	let html: string;
	if (import.meta.env.DEV) {
		html = (await import("/index.html?raw")).default;
		html = await __vite_server.transformIndexHtml("/", html);
	} else {
		html = (await import("/dist/client/index.html?raw")).default;
	}

	const ssrHtml = ReactDOMServer.renderToString(<App />);
	html = html.replace(`<div id="root">`, () => `<div id="root">` + ssrHtml);
	if (import.meta.env.DEV) {
		html = html.replace(
			`<head>`,
			() => `<head><link rel="stylesheet" href="/src/index.css?direct" />`,
		);
	}

	res.setHeader("content-type", "text/html").end(html);
}
