## context

`pnpm -C packages/react-server/examples/basic cf-build` failure in https://github.com/hi-ogawa/vite-plugins/pull/673

## reproduction

```sh
# vite
$ npx vite build --ssr
$ grep --color '"react"' dist/main.js
import require$$0 from "react";

# rolldown-vite
$ npx vite build --ssr
$ grep --color '"react"' dist/main.js
import React from "react";
        var useSyncExternalStore = __require("react").useSyncExternalStore;
                var useSyncExternalStore$jscomp$inline_1 = __require("react").useSyncExternalStore;

# __require("react") prevents downstream bundling e.g. cloudflare deployment
$ npx esbuild --bundle dist/main.js --platform=node --format=esm --outfile=dist/main-esbuild.js
```
