# Waku + Use Cache 

Using https://github.com/jacob-ebey/vite-plugin-react-use-cache/ on Waku.

1. Create middleware `src/use-cache-middleware.ts`

```ts
import type { Middleware } from 'waku/config';
import { provideCache } from "vite-plugin-react-use-cache/runtime";
import { createUnstorageCache } from "vite-plugin-react-use-cache/unstorage";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({ driver: fsDriver({ base: "./node_modules/.use-cache" }) });

const useCacheMiddleware: Middleware = () => async (_ctx, next) => {
  return provideCache(createUnstorageCache(storage), () => next());
};

export default useCacheMiddleware;
```

2. Configure `waku.config.ts`

```ts
import { defineConfig } from 'waku/config';
import { useCachePlugin } from 'vite-plugin-react-use-cache';

export default defineConfig({
  middleware: [
    'waku/middleware/context',
    "./src/use-cache-middleware",
    'waku/middleware/handler',
  ],
  vite: {
    plugins: [
      useCachePlugin(),
    ],
  },
});
```

3. Use `"use cache"` (see `src/index.tsx`)

```tsx
import {
  cacheTag,
  cacheLife,
  revalidateTag,
} from "vite-plugin-react-use-cache/runtime";
import { unstable_rerenderRoute } from 'waku/router/server';

async function CachedComponent() {
  "use cache";

  cacheLife("minutes");
  cacheTag("home-page");

  console.log("[Rendering CachedComponent... (0.5sec)]");
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div>
      <div>rendered at {new Date().toString()}</div>
      <form
        action={async () => {
          "use server";
          unstable_rerenderRoute('/');
          await revalidateTag("home-page");
        }}
      >
        <button type="submit">Revalidate Home</button>
      </form>
    </div>
  );
}
```
