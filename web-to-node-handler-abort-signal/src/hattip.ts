import { createMiddleware } from "@hattip/adapter-node/native-fetch";

function handler(_req: Request) {
	let aborted = false;
	_req.signal.addEventListener("abort", () => {
		console.log("abort!");
		aborted = true;
	});

	let cancelled = false;

	const stream = new ReadableStream<string>({
		async start(controller) {
			for (let i = 0; !aborted && !cancelled; i++) {
				console.log({ i });
				controller.enqueue(`i = ${i}\n`);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
			controller.close();
		},
		cancel() {
			console.log("cancel!");
			cancelled = true;
		},
	});

	return new Response(stream.pipeThrough(new TextEncoderStream()));
}

export default createMiddleware((ctx) => handler(ctx.request));
