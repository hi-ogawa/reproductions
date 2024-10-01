import { glob } from "tinyglobby";
import fg from "fast-glob";
import { fileURLToPath } from "node:url";

console.log(
  "[tinyglobby]",
  await glob(["../b/**/*.txt"], {
    cwd: fileURLToPath(new URL("./files/a", import.meta.url)),
    ignore: ["**/ignore/**"],
  }),
);

console.log(
  "[fast-glob]",
  await fg.glob(["../b/**/*.txt"], {
    cwd: fileURLToPath(new URL("./files/a", import.meta.url)),
    ignore: ["**/ignore/**"],
  }),
);
