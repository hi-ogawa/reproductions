import React from "react";
import { ApiResult } from "../vite.config";

export function App() {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState<ApiResult>();

  const handleSubmit = () =>
    React.startTransition(async () => {
      const res = await fetch(
        "/api/transform?" + new URLSearchParams({ input }),
      );
      if (res.ok) {
        setResult(await res.json());
      } else {
        alert("Transform failed\n" + (await res.text()));
      }
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h4>Oxc transform source map debugger</h4>
      <label>Input</label>
      <textarea
        rows={10}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <label>
        Oxc output{" "}
        {result?.oxc.map && (
          <a
            href={generateSourcemapVisualizerLink(
              result.oxc.code,
              JSON.stringify(result.oxc.map),
            )}
            target="_blank"
          >
            (source map)
          </a>
        )}
      </label>
      <textarea rows={10} readOnly value={result?.oxc.code} />
      <label>
        Esbuild output{" "}
        {result?.esbuild.map && (
          <a
            href={generateSourcemapVisualizerLink(
              result.esbuild.code,
              result.esbuild.map,
            )}
            target="_blank"
          >
            (source map)
          </a>
        )}
      </label>
      <textarea rows={10} readOnly value={result?.esbuild.code} />
    </div>
  );
}

function generateSourcemapVisualizerLink(code: string, map: string) {
  const hashRaw = `${code.length}\0${code}${map.length}\0${map}`;
  const hash = btoa(hashRaw);
  return `https://evanw.github.io/source-map-visualization/#` + hash;
}
