import { expect, it } from "vitest";

function inlineSourceMap() {
  const code = "...";
  const encoded = "..."
  return `${code}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${encoded}\n`;
}

it('repro', () => {
  try {
    expect(1234).toMatchInlineSnapshot();
  } catch (e) {
    console.error(e);
    throw e
  }
})
