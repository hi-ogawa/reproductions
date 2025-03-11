import fs from "node:fs";
import MagicString from "magic-string"

function main() {
  const file = process.argv[2];
  const code = fs.readFileSync(file, "utf-8");
  const ms = new MagicString(code);
  ms.prepend("\n//xxx\n");
  const map = ms.generateMap({
    file,
    includeContent: true,
    hires: "boundary",
  });
  map.sourceRoot = new URL(".", import.meta.url);
  fs.mkdirSync("dist/magic", { recursive: true });
  fs.writeFileSync(
    `dist/magic/${file}`,
    ms.toString() + `\n//# sourceMappingURL=${file}.map\n`,
  );
  fs.writeFileSync(`dist/magic/${file}.map`, JSON.stringify(map, null, 2));
}

main();
