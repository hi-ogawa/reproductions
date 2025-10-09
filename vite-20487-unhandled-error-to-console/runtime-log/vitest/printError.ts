import { stripVTControlCharacters } from "node:util";

export const c = {
  gray: (s: string) => s,
  red: (s: string) => s,
};

export function generateCodeFrame(
  source: string,
  indent = 0,
  loc: { line: number; column: number } | number,
  range = 2,
): string {
  const start =
    typeof loc === "object"
      ? positionToOffset(source, loc.line, loc.column)
      : loc;
  const end = start;
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let count = 0;
  let res: string[] = [];

  const columns = process.stdout?.columns || 80;

  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + nl;
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue;
        }

        const lineLength = lines[j].length;
        const strippedContent = stripVTControlCharacters(lines[j]);

        if (strippedContent.startsWith("//# sourceMappingURL")) {
          continue;
        }

        // too long, maybe it's a minified file, skip for codeframe
        if (strippedContent.length > 200) {
          return "";
        }

        res.push(
          lineNo(j + 1) +
            truncateString(lines[j].replace(/\t/g, " "), columns - 5 - indent),
        );

        if (j === i) {
          // push underline
          const pad = start - (count - lineLength) + (nl - 1);
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start,
          );
          res.push(lineNo() + " ".repeat(pad) + c.red("^".repeat(length)));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(1, Math.min(end - count, lineLength));
            res.push(lineNo() + c.red("^".repeat(length)));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }

  if (indent) {
    res = res.map((line) => " ".repeat(indent) + line);
  }

  return res.join("\n");
}

function lineNo(no: number | string = "") {
  return c.gray(`${String(no).padStart(3, " ")}| `);
}

export const lineSplitRE: RegExp = /\r?\n/;

export function positionToOffset(
  source: string,
  lineNumber: number,
  columnNumber: number,
): number {
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let start = 0;

  if (lineNumber > lines.length) {
    return source.length;
  }

  for (let i = 0; i < lineNumber - 1; i++) {
    start += lines[i].length + nl;
  }

  return start + columnNumber;
}

export function offsetToLineNumber(source: string, offset: number): number {
  if (offset > source.length) {
    throw new Error(
      `offset is longer than source length! offset ${offset} > length ${source.length}`,
    );
  }
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let counted = 0;
  let line = 0;
  for (; line < lines.length; line++) {
    const lineLength = lines[line].length + nl;
    if (counted + lineLength >= offset) {
      break;
    }

    counted += lineLength;
  }
  return line + 1;
}

export function truncateString(text: string, maxLength: number): string {
  const plainText = stripVTControlCharacters(text);

  if (plainText.length <= maxLength) {
    return text;
  }

  return `${plainText.slice(0, maxLength - 1)}…`;
}
