# Playwright tracing `group` location sources missing

- generate `trace.zip`

```sh
node src/repro.js
```

- local `show-trace` shows `dummy.js` source for `tracing.group` API

```
pnpm playwright show-trace trace.zip
```

<img width="898" height="691" alt="image" src="https://github.com/user-attachments/assets/b19ec644-26c6-4aa0-9ec4-f6e11bc63625" />

- previwing the same `trace.zip` on https://trace.playwright.dev/ doesn't show `dummy.js` source.

<img width="898" alt="image" src="https://github.com/user-attachments/assets/6a231144-f87e-4a02-9598-3b545053b415" />


## References

- https://github.com/vitest-dev/vitest/pull/9652
