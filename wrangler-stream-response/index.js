// @ts-check

/**
 *
 * @param {Request} request
 * @returns
 */
function handler(request) {
	const url = new URL(request.url);
	if (url.pathname !== "/") {
		return new Response("Not found", { status: 404 });
	}

	const stream = new ReadableStream({
		async start(controller) {
			controller.enqueue(
				`<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body>\n`,
			);
			// need certain amount of data to start pushing compressed stream?
			controller.enqueue(`<!-- test -->\n`.repeat(10000));
			controller.enqueue("<div>START</div>\n");
			for (let i = 0; i < 5; i++) {
				await sleep(500);
				controller.enqueue(`<div>test ${i}</div>\n`);
			}
			controller.enqueue("<div>END</div>\n");
			controller.enqueue(`</body></html>`);
			controller.close();
		},
	}).pipeThrough(new TextEncoderStream());

	return new Response(stream, {
		headers: {
			"content-type": "text/html",
		},
	});
}

const sleep = (/** @type {number} */ ms) =>
	new Promise((r) => setTimeout(r, ms));

export default { fetch: handler };
