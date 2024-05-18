export async function handler(req: Request) {
	let aborted = false;
	req.signal.addEventListener("abort", () => {
		console.log("abort!");
		aborted = true;
	});

	const url = new URL(req.url);
	if (url.pathname === "/api/simple") {
		return new Response("simple!");
	}

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
