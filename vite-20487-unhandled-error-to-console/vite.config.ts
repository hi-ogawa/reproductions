import { defineConfig } from "vite";
import { runtimeLogPlugin } from "./runtime-log/plugin";

export default defineConfig({
  plugins: [runtimeLogPlugin()],
});
