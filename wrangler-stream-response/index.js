// @ts-check

function handler() {
	const stream = new ReadableStream({
		async start(controller) {
			controller.enqueue(`<!DOCTYPE html><html><head></head><body>\n`);
			controller.enqueue("<div>START</div>\n");
			for (let i = 0; i < 3; i++) {
				await sleep(1000);
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
