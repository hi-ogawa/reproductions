import { Miniflare } from "miniflare";
import process from "node:process";

const mf = new Miniflare({
  modules: true,
  script: /* js */ `
    export default {
      fetch: (request) => {
        console.log("[workerd] request.url =", request.url);
        if (request.url.includes("redirect-absolute")) {
          return new Response(null, { status: 302, headers: { "Location": "https://example.local/ok" } })
        }
        if (request.url.includes("redirect")) {
          return new Response(null, { status: 302, headers: { "Location": "/ok" } })
        }
        if (request.url.includes("no-content")) {
          return new Response(null, { status: 204, headers: { "x-custom": "hello" } })
        }
        return new Response("Hello " + request.url);
      }
    }
  `,
});

const response = await mf.dispatchFetch(process.argv[2], { redirect: "manual" });
console.log("[node] response", {
  status: response.status,
  headers: Object.fromEntries(response.headers),
  text: await response.text(),
});

await mf.dispose();
