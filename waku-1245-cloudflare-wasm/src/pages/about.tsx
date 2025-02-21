import { createHighlighterCore } from "shiki/core";
import js from "shiki/langs/javascript.mjs";
import nord from "shiki/themes/nord.mjs";

// similar to
// https://github.com/hi-ogawa/vite-plugins/blob/e154a878efd3a40e8691df6ffa55bc9389d07805/packages/react-server/examples/basic/src/routes/test/wasm/page.tsx

function once<T>(f: () => T) {
  let value: T | undefined;
  return () => (value ??= f())
}

const getHighlither = once(async () => {
  return createHighlighterCore({
    themes: [nord],
    langs: [js],
    loadWasm: import("shiki/onig.wasm?module" as string),
  });
});

export default async function Page() {
  const highligher = await getHighlither();
  const code = `export default "ok"`;
  const html = highligher.codeToHtml(code, {
    lang: "js",
    theme: "nord",
  });
  return (
    <div className="flex flex-col gap-2 p-2">
      <h4 className="font-lg">Wasm</h4>
      <a className="antd-link" href="https://github.com/shikijs/shiki">
        Shiki
      </a>
      <style>{`
        .shiki {
          padding: 0.5rem 1rem;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic'
  } as const;
};
