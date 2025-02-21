import { createHighlighterCore, HighlighterCore } from "shiki/core";
import js from "shiki/langs/javascript.mjs";
import nord from "shiki/themes/nord.mjs";
import { PageProps } from "waku/router";

// same setup as
// https://github.com/hi-ogawa/vite-plugins/blob/e154a878efd3a40e8691df6ffa55bc9389d07805/packages/react-server/examples/basic/src/routes/test/wasm/page.tsx

const getHighlither = (): Promise<HighlighterCore> => {
  return ((globalThis as any).__shikiHighlither ??= createHighlighterCore({
    themes: [nord],
    langs: [js],
    loadWasm: import("shiki/onig.wasm?module" as string),
  }));
};

export default async function Page(props: PageProps<"/">) {
  const highligher = await getHighlither();
  const code =
    new URLSearchParams(props.query).get("code") ?? `export default "test"`;
  const html = highligher.codeToHtml(code, {
    theme: "nord",
    lang: "js",
  });
  return (
    <div>
      <h4>Waku + Shiki + Cloudflare</h4>
      <style>{`
        .shiki {
          padding: 0.5rem 1rem;
        }
      `}</style>
      <form method="GET" action="/">
        <input name="code" defaultValue={code} />
      </form>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
