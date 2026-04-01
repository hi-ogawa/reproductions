# vitest-10036-playwright-webkit-fill-shadow-dom

Minimal repro for a Playwright `1.59.0` regression suspected from Vitest PR `#10036` https://github.com/vitest-dev/vitest/pull/10036

Target bug:

- remote `browserType.connect(...)`
- WebKit
- `locator.fill("Hello")` on `contenteditable` inside shadow DOM

Expected:

- WebKit: write `Hello`

Actual on the affected setup:

- WebKit: `fill("Hello")` is a no-op

## How to run

- On playwright 1.59.0

```sh
$ pnpm install

$ docker compose up playwright

$ node repro.mjs chromium
{
  fillResult: { textContent: 'Hello', innerText: 'Hello' },
  keyboardTypeResult: { textContent: 'Hello', innerText: 'Hello' }
}

$ node repro.mjs webkit
{
  fillResult: { textContent: '', innerText: '' },
  keyboardTypeResult: { textContent: 'Hello', innerText: 'Hello' }
}
```

- On playwright 1.58.2

```sh
$ pnpm install -D playwright@1.58.2

$ docker compose up playwright-prev

$ node repro.mjs chromium
{
  fillResult: { textContent: 'Hello', innerText: 'Hello' },
  keyboardTypeResult: { textContent: 'Hello', innerText: 'Hello' }
}

$ node repro.mjs webkit
{
  fillResult: { textContent: 'Hello', innerText: 'Hello' },
  keyboardTypeResult: { textContent: 'Hello', innerText: 'Hello' }
}
```
