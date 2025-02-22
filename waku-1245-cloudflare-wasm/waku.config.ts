import { defineConfig } from "waku/config";
import { vitePluginWasmModule } from "@hiogawa/vite-plugin-server-asset";

export default defineConfig({
  unstable_viteConfigs: {
    common: () => ({
      // see https://github.com/hi-ogawa/vite-plugins/tree/main/packages/server-asset#vitepluginwasmmodule
      // additionally needs `--import @hiogawa/vite-plugin-server-asset/hooks/register-wasm`
      // to import wasm on NodeJs for prerendering
      // TODO: adding to 'build-server' should be enough?
      plugins: [vitePluginWasmModule({ buildMode: "import" })],
    }),
  },
});
