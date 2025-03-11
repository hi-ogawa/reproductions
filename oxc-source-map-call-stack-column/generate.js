import { transform } from "oxc-transform";
import fs from "node:fs";

function main() {
  const file = process.argv[2];
  const code = fs.readFileSync(file, "utf-8");
  const result = transform(file, code, { sourcemap: true });
  result.map.sourceRoot = new URL(".", import.meta.url);
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync(
    `dist/${file}`,
    result.code + `\n//# sourceMappingURL=${file}.map\n`,
  );
  fs.writeFileSync(`dist/${file}.map`, JSON.stringify(result.map, null, 2));
}

main();
