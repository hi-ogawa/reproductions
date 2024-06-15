import ReactDOMServer from "react-dom/server.edge";

export function handler(flightStream: ReadableStream<Uint8Array>) {
	console.log(ReactDOMServer);
	flightStream;
	return new Response("todoojiopooo", {
		headers: {
			"content-type": "text/x-component;charset=utf-8",
		},
	});
}
