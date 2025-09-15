# Vite + RSC

Self-hosted font with preloading based on https://fontsource.org/docs/getting-started/preload

## Example

- `src/root.tsx`

```tsx
import "@fontsource-variable/orbitron";
import fontUrl from "@fontsource-variable/orbitron/files/orbitron-latin-wght-normal.woff2";

export function Root() {
  return (
    <html lang="en">
      <head>
        ...
        <link
          rel="preload"
          as="font"
          href={fontUrl}
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      ...
    </html>
  );
}
```

Additionally you can use [fontaine](https://github.com/unjs/fontaine/) to generate metric-based fallback font.

- `vite.config.ts`

```tsx
import { FontaineTransform } from "fontaine";

export default defineConfig({
  plugins: [
    rsc(),
    react(),
    FontaineTransform.vite({
      fallbacks: [
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Roboto",
        "Noto Sans",
      ],
    }),
  ]
  ...
})
```

The following screencast shows how the fallback font looks by simulating slow loading `.woff2` file (see `simulate-fallback` plugin in `vite.config.ts`).

```sh
TEST_FALLBACK=1 pnpm dev
```

https://github.com/user-attachments/assets/ea7f629b-0c54-4d5c-a27a-addd58c16eca

## Note

> [!NOTE]
> This is fixed by https://github.com/vitejs/vite-plugin-react/pull/841 and not necessary anymore.

The font flashes twice during dev by going through "with font -> without font -> with font".
This is likely due to RSC plugin's server css injection and immediate removal on browser, which causes re-fetching a same font file momentarily.

This can be worked around by adding `cache-control` to avoid immediate font re-fetching on browser, for example:

- `vite.config.ts`

```tsx
export default defineConfig({
  plugins: [
    {
      name: 'fix-dev-font-double-flash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url || "", "http://localhost");
          if (url.pathname.endsWith(".woff2")) {
            res.setHeader("cache-control", "max-age=10");
          }
          next()
        })
      },
    },
    ...
  ]
})
```
