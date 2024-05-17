import { createMiddleware } from "@hattip/adapter-node/native-fetch";

export default createMiddleware((ctx) => handler(ctx.request));

function handler(req: Request) {
	let aborted = false;
	req.signal.addEventListener("abort", () => {
		console.log("abort!");
		aborted = true;
	});

	const stream = new ReadableStream<string>({
		async start(controller) {
			for (let i = 0; !aborted; i++) {
				console.log({ i });
				controller.enqueue(`i = ${i}\n`);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		},
	});

	return new Response(stream.pipeThrough(new TextEncoderStream()), {
		headers: {
			"content-type": "octe",
		},
	});
}
