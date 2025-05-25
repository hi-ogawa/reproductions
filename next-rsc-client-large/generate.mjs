
import fs from "node:fs"

function main() {
  let data = "export default `\n";
  const buffer = new Uint8Array(90);
  for (let i = 0; i < 100000; i++) {
    data += Buffer.from(crypto.getRandomValues(buffer)).toString("base64");
    data += "\n";
  }
  data += "`;\n";
  fs.writeFileSync("app/large.js", data);
}

main();
