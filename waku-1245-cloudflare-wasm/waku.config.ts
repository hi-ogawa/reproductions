import { defineConfig } from "waku/config";
import { vitePluginWasmModule } from "@hiogawa/vite-plugin-server-asset";

export default defineConfig({
  unstable_viteConfigs: {
    common: () => ({
      // see https://github.com/hi-ogawa/vite-plugins/tree/main/packages/server-asset#vitepluginwasmmodule
      // TODO: adding to 'build-server' should be enough?
      plugins: [vitePluginWasmModule({ buildMode: "import" })],
      build: {
        ssrEmitAssets: true,
      },
    }),
    "build-client": () => ({
      plugins: [
        // need to counter act on .wasm moved from rsc build to client build
        // https://github.com/dai-shi/waku/blob/29af481f1937abc34ef8cdec4a312f5edd5947d7/packages/waku/src/lib/builder/build.ts#L441-L445
        {
          name: "workaround",
          writeBundle() {},
        },
      ],
    }),
  },
});
