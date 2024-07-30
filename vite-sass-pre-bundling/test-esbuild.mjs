import { sassPlugin } from "esbuild-sass-plugin";
import * as esbuild from "esbuild";

// run
//   node test-esbuild.mjs

async function main() {
  await esbuild.build({
    entryPoints: ["dep-with-sass"],
    outdir: "dist",
    bundle: true,
    format: "esm",
    plugins: [
      sassPlugin({
        type: "style"
      })
    ]
  })
}

main();
