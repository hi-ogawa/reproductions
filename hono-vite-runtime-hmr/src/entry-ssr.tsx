import { renderToString } from "react-dom/server";
import { App } from "./app";
import type { ViteDevServer } from "vite";

console.log("[import]", import.meta.url);

declare let __viteServer: ViteDevServer;

export default {
  async fetch(_request: Request) {
    let html: string;
    if (import.meta.env.DEV) {
      html = (await import("/index.html?raw")).default;
      html = await __viteServer.transformIndexHtml("/", html);
    } else {
      html = (await import("/dist/client/index.html?raw")).default;
    }

    const ssrHtml = renderToString(<App />);
    html = html.replace("<body>", `<body><div id="root">${ssrHtml}</div>`);
    return new Response(html, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
