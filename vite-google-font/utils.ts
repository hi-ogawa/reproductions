import type { JSX } from "react";
import type { Plugin } from "vite";

// https://github.com/vercel/next.js/blob/bdb12360376a6996d84cac06b7c3a2671232973a/crates/next-core/src/next_font/google/mod.rs#L66
const USER_AGENT = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36`;

export function googleFontPlugin(fontPluignOptions: {
  fonts: string[];
  subset?: string[];
}): Plugin {
  let resultCss: string;

  async function handleCssUrls(urls: string[]) {
    const results = await Promise.all(
      urls.map((url) => fetchFontCss(url, fontPluignOptions.subset)),
    );
    const css = results.map((r) => r.css).join("\n");
    const links = results.flatMap((r) => r.links);
    return {
      css,
      links,
    };
  }

  return {
    name: "font:google",
    resolveId(source) {
      if (source.startsWith("virtual:font")) {
        return "\0" + source;
      }
    },
    async load(id) {
      if (id === "\0virtual:font") {
        const result = await handleCssUrls(fontPluignOptions.fonts);
        resultCss = result.css;
        return `\
import "virtual:font.css";
import * as __react__ from "react";
const Font = ${createFontFn.toString()}(__react__, ${JSON.stringify(result.links)});
export default Font;
`;
      }
      if (id === "\0virtual:font.css" || id === "\0virtual:font.css?direct") {
        return resultCss;
      }
    },
  };
}

function createFontFn(
  React: typeof import("react"),
  links: JSX.IntrinsicElements["link"][],
) {
  const h = React.createElement;
  return function Font() {
    return h(React.Fragment, null, ...links.map((props) => h("link", props)));
  };
}

async function fetchFontCss(url: string, preloadSubsets?: string[]) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch font css: ${url} - ${res.status} ${res.statusText}`,
    );
  }
  const css = await res.text();
  const metas = analyzeGoogleFontCss(css);
  const links: JSX.IntrinsicElements["link"][] = [];
  if (preloadSubsets) {
    for (const meta of metas) {
      if (meta.subset && preloadSubsets.includes(meta.subset)) {
        links.push({
          rel: "preload",
          as: "font",
          crossOrigin: "",
          href: meta.url,
          ...(meta.type && { type: `font/${meta.type}` }),
        });
      }
    }
  }
  return {
    css,
    metas,
    links,
  };
}

type FontMeta = {
  url: string;
  subset?: string;
  type?: string;
};

// https://github.com/vercel/next.js/blob/bdb12360376a6996d84cac06b7c3a2671232973a/crates/next-core/src/next_font/google/mod.rs#L526
export function analyzeGoogleFontCss(css: string) {
  const metas: FontMeta[] = [];
  let subset: string | undefined;
  for (const line of css.split("\n")) {
    const subsetMatch = line.match(/\/\*\s*(.+?)\s*\*\//);
    if (subsetMatch) {
      subset = subsetMatch[1];
      continue;
    }
    const srcMatch = line.match(
      /src:\s*url\(['"]?(.+?)['"]?\)(?:\s*format\(['"]?(.+?)['"]?\))/,
    );
    if (srcMatch) {
      metas.push({ subset, url: srcMatch[1], type: srcMatch[2] });
    }
  }
  return metas;
}
