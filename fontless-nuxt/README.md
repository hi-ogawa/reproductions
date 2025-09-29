# Nuxt + Fontless

## Setup

- add `fontless` plugin to `nuxt.config.ts`

```js
import { fontless } from "fontless"

export default defineNuxtConfig({
  ...,

  // disable @nuxt/ui's default @nuxt/font integration
  ui: {
    fonts: false,
  },

  vite: {
    plugins: [
      fontless({
        // ...options
      }),
    ],
  },
})
```

- add preload links to `app/app.vue`

```vue
<script setup>
import { preloads } from "fontless/runtime"

useHead({
  link: preloads.map(href => ({
    rel: 'preload',
    as: 'font',
    href,
    crossorigin: 'anonymous',
  }))
})
</script>
```
