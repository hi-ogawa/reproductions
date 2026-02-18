# Playwright tracing `group` location sources missing

```sh
# generate trace.zip
node src/repro.js

# local preview shows `dummy.js` source for `tracing.group` API
pnpm playwright show-trace trace.zip
```

Previwing the same `trace.zip` on https://trace.playwright.dev/ doesn't show `dummy.js` source.

## References

- https://github.com/vitest-dev/vitest/pull/9652
