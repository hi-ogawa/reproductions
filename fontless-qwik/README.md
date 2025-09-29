# Qwik City + Fontless

## Setup

- add `fontless` plugin in `vite.config.ts`

```ts
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { fontless } from "fontless"

export default defineConfig(({ command, mode }): UserConfig => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        // disable default font preload to avoid over-preload
        disableFontPreload: true,
      }),
      fontless({
        provider: 'google',
        defaults: {
          preload: true,
        }
      }),
    ],
    ...
  }
})
```

- add preload links to head (see `src/components/router-head/router-head.tsx`)

```js
import { preloads } from "fontless/runtime"

export const RouterHead = component$(() => {
  ...
  return (
    <>
      {preloads.map((href) => 
        <link key={href} rel="preload" as="font" href={href} {...{crossorigin: ""}} />)
      }
      ...
    </>
  );
});
```
