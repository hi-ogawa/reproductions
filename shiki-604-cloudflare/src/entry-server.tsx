import type http from "node:http";
import type { ViteDevServer } from "vite";
import { App } from "./app";
import { renderToString } from "vue/server-renderer";

export default async function handler(
	req: http.IncomingMessage & { viteDevServer: ViteDevServer },
	res: http.ServerResponse,
) {
	let html: string;
	if (import.meta.env.DEV) {
		html = (await import("/index.html?raw")).default;
		html = await req.viteDevServer.transformIndexHtml("/", html);
	} else {
		html = (await import("/dist/client/index.html?raw")).default;
	}

	const ssrHtml = await renderToString(<App />);
	html = html.replace("<body>", () => `<body><div id="root">${ssrHtml}</div>`);
	res.setHeader("content-type", "text/html").end(html);
}
