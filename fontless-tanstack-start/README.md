# Tanstack Start + Fontless

## Setup

- Add `fontless` plugin to `vite.config.ts`

- Add fonts to `src/styles.css`, e.g.

```css
body {
  font-family: "Geist", ...
}

code {
  font-family: "Geist Mono", ...
}
```

- Add preload links to `src/routes/__root.tsx`

```tsx
import { preloads } from "fontless/runtime" 

export const Route = createRootRoute({
  head: () => ({
    ...
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      ...preloads.map(href => ({
        rel: 'preload', as: 'font', href, crossOrigin: 'anonymous'
      }))
    ],
  }),
  ...
})
```
