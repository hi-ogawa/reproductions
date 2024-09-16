import * as sass from "sass";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

async function main() {
  const code = `
    @import "/variables.scss";
    body {
      color: $primary;
    }
  `;
  if (process.argv[2] === "modern") {
    const res = sass.compileString(code, {
      url: new URL("file:///main.scss"),
      sourceMap: true,
      importers: [
        {
          canonicalize(url) {
            if (url === "/variables.scss") {
              return new URL("./variables.scss", import.meta.url);
            }
          },
          load(canonicalUrl) {
            return {
              contents: fs.readFileSync(canonicalUrl, "utf-8"),
              syntax: "scss",
            };
          },
        },
      ],
    });
    console.log({ css: res.css, map: res.sourceMap });
  } else if (process.argv[2] === "modern-findFileUrl") {
    const res = sass.compileString(code, {
      url: new URL("file:///main.scss"),
      sourceMap: true,
      importers: [
        {
          findFileUrl(url) {
            if (url === "/variables.scss") {
              return new URL("./variables.scss", import.meta.url);
            }
          },
        },
      ],
    });
    console.log({ css: res.css, map: res.sourceMap });
  } else {
    sass.render(
      {
        file: "/main.scss",
        outFile: "/main.scss",
        data: code,
        sourceMap: true,
        omitSourceMapUrl: true,
        sourceMapRoot: "/",
        importer: (url) => {
          if (url === "/variables.scss") {
            return {
              file: fileURLToPath(new URL("./variables.scss", import.meta.url)),
            };
          }
        },
      },
      (error, res) => {
        if (error) {
          console.error(error);
        }
        if (res) {
          res.css = res.css.toString();
          if (res.map) {
            res.map = JSON.parse(res.map.toString());
          }
          console.log({ css: res.css, map: res.map });
        }
      },
    );
  }
}

main();
