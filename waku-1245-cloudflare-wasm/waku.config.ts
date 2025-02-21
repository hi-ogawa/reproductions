import { defineConfig } from "waku/config";
import { vitePluginWasmModule } from "@hiogawa/vite-plugin-server-asset";

// this can also allow importing ".wasm" on node for pre-rendering
// import { register } from "node:module"
// register("@hiogawa/vite-plugin-server-asset/hooks/wasm", import.meta.url);

export default defineConfig({
  unstable_viteConfigs: {
    common: () => ({
      // see https://github.com/hi-ogawa/vite-plugins/tree/main/packages/server-asset#vitepluginwasmmodule
      // TODO: adding to 'build-server' should be enough?
      plugins: [vitePluginWasmModule({ buildMode: "import" })],
    }),
  },
});
