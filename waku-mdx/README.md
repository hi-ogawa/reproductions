# waku + mdx example

1. Add `@mdx-js/rollup` to `waku.config.ts`.

```js
// waku.config.ts

import { defineConfig } from "waku/config";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  vite: {
    plugins: [mdx()],
  },
});
```

2. Include `mdx` in custom server entry's fs router glob.

```js
// src/server-entry.tsx

import { unstable_fsRouter } from "waku/router/server";

export default unstable_fsRouter(
  import.meta.glob("/src/pages/**/*.{mdx,js,jsx,ts,tsx}", {
    base: "/src/pages",
  }),
  {
    apiDir: "api",
    slicesDir: "_slices",
  },
);
```

3. Write route files in `src/pages` with mdx. For example,

```mdx
{/* src/pages/index.mdx */}

import { Link } from "waku";
import { Counter } from "../components/counter";

<title>Waku</title>

# Waku

Hello world!

<Counter />

<Link to="/about">About page</Link>
```
