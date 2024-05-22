import "@vitest/web-worker";
import { expect, test } from "vitest";

// stderr | src/lib-worker.test.ts > basic
// TypeError: Invalid URL
//     at new URL (node:internal/url:796:36)
//     at Module.default (/home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/dist/lib.js:143:5)
//     at /home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/src/lib-worker.ts:3:13
//     at InlineWorkerRunner.runModule (file:///home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/node_modules/.pnpm/vite-node@1.6.0/node_modules/vite-node/dist/client.mjs:362:5)
//     at InlineWorkerRunner.directRequest (file:///home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/node_modules/.pnpm/vite-node@1.6.0/node_modules/vite-node/dist/client.mjs:346:5)
//     at InlineWorkerRunner.cachedRequest (file:///home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/node_modules/.pnpm/vite-node@1.6.0/node_modules/vite-node/dist/client.mjs:189:14)
//     at InlineWorkerRunner.executeFile (file:///home/hiroshi/code/personal/reproductions/vitest-5704-emscripten-esm-worker/node_modules/.pnpm/vite-node@1.6.0/node_modules/vite-node/dist/client.mjs:161:12) {
//   code: 'ERR_INVALID_URL',
//   input: '/dist'
// }

test("basic", async () => {
	const worker = new Worker(new URL("./lib-worker.ts", import.meta.url));
	const promise = new Promise((resolve) => {
		worker.onmessage = (e) => {
			resolve(e.data);
		};
	});
	worker.postMessage({});
	expect(await promise).toMatchInlineSnapshot();
});
