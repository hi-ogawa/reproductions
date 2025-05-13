import * as React from "react";
import * as ReactDomServer from "react-dom/server.edge";

async function main() {
  const h = React.createElement;
  const root = h("html", null, h("body", null, "x".repeat(Number(process.env.TEST_COUNT || 100)) + "🙂"));
  const stream = await ReactDomServer.renderToReadableStream(root);
  const decoder = new TextDecoder("utf-8");
  await stream.pipeTo(
    new WritableStream({
      write(chunk) {
        let decoded;
        try {
          decoded = decoder.decode(chunk, { stream: !!process.env.TEST_STREAM });
        } catch (error) {
          console.error(error);
        }
        console.log({ chunk, decoded, decodedLength: decoded && decoded.length });
      },
      close() {
        console.log("[close]");
      },
    }),
  );
}

main();

export {};
