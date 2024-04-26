import { expect, it } from 'vitest'

it('basic', async () => {
  expect(window.navigator.userAgent).toMatchInlineSnapshot(`"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"`);
})
