// this can also allow importing ".wasm" on node for pre-rendering
import { register } from "node:module"
register("@hiogawa/vite-plugin-server-asset/hooks/wasm", import.meta.url)
