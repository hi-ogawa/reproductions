import { expect, test } from 'vitest'
import { normalFn } from './normal';

test('normal', () => {
  expect(normalFn()).toBe(2)
})

test('worker dynamic dep', async () => {
  const worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' });
  const data = await new Promise((resolve, reject) => {
    worker.addEventListener("message", (e) => resolve(e.data))
    worker.addEventListener("messageerror", (e) => reject(e))
    worker.postMessage("ping");
  });
  expect(data).toMatchInlineSnapshot(`"worker-dynamic-dep-ok"`);
})
