# Vitest browser package optimization repro

This reproduces browser dependency optimization from a typical installation where the user installs `@vitest/browser-playwright`, but not its transitive `@vitest/browser` dependency directly.

```sh
pnpm install
pnpm exec playwright install chromium
rm -rf node_modules/.vite
pnpm test
```

The test passes, but the cold run reports:

```text
Failed to resolve dependency: @vitest/browser/client, present in client 'optimizeDeps.include'
```

The locator modules consequently remain non-optimized `node_modules/.pnpm/...` URLs. Adding `@vitest/browser` as a direct dependency makes the include resolvable, but then runtime discovery of the separately omitted `@vitest/browser/locators` invalidates the initial optimization and causes the first run to fail with `Vitest failed to find the current suite`.

Tested with Vitest `5.0.0-beta.7` and Vite `8.1.5`.
