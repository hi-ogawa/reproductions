## Context

- https://github.com/vitest-dev/vitest/issues/9043

## References

- https://opentelemetry.io/docs/languages/js/getting-started/browser/
- https://opentelemetry.io/docs/languages/js/exporters/#usage-in-the-browser

## Example

```sh
# 1. Start Jaeger
$ docker compose up -d

# 2. Start Vite app
$ pnpm dev

# 3. Open http://localhost:3000 and click a button

# 4. Open Jaeger UI at http://localhost:16686 to see the traces
```

## Questions

- Does `ZoneContextManager` work out of the box? (Doesn't it require transforming async/await?)

- Optimize deps or not?
