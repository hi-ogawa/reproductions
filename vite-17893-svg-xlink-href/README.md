https://github.com/vitejs/vite/issues/17893

```sh
pnpm dlx sirv-cli --dev
```

- run `pnpm dlx sirv-cli --dev`
- open http://localhost:8080 and see search icon
  - note that `sirv` uses `Cache-Control: no-store` for all responses.
- comment out `<symbol id="search" >` inside `ui-icons.svg`
- reload a page
  - Chrome doesn't request `ui-icons.svg` and it still shows search icon.
    Devtool's "disable cache" doesn't affect anything. (cf. https://issues.chromium.org/issues/348598125)
  - Firefox always requests `ui-icons.svg` and search icon disappears.
