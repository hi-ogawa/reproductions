# Playwright tracing `group` location sources missing

- Run repro.js to generate trace.zip

```sh
node repro.js
```

- local `show-trace` shows `repro-dummy.js` source for `tracing.group` API

```
pnpm playwright show-trace trace.zip
```

<img width="1027" height="751" alt="Image" src="https://github.com/user-attachments/assets/bf75e0bf-75ac-4eca-8b0d-fe522f5a62c7" />

- previwing the same `trace.zip` on https://trace.playwright.dev/ doesn't show `repro-dummy.js` source.

<img width="1015" height="720" alt="Image" src="https://github.com/user-attachments/assets/255ea62b-613e-487b-bf9a-5c373d8ac8eb" />

## References

- https://github.com/vitest-dev/vitest/pull/9652
