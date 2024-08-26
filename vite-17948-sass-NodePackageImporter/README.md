Sass `pkg:` import example on Vite with Sass modern api.

```ts
import { defineConfig } from "vite";
import { NodePackageImporter } from "sass-embedded";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        importers: [new NodePackageImporter()],
      },
    },
  },
});
```

## links

- https://github.com/vitejs/vite/discussions/17948
- https://github.com/vitejs/vite/issues/16438
- https://sass-lang.com/documentation/at-rules/use/#node-js-package-importer
