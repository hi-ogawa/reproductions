import React from "react";
import { ApiResult } from "../vite.config";

export function App() {
  const [input, setInput] = React.useState(
    `console.log("hello", <div>world</div>);`,
  );
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        margin: "1rem auto",
      }}
    >
      <h4 style={{ margin: 0 }}>Oxc transform source map debugger</h4>
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
      <button onClick={() => handleSubmit()}>
        Transform (Control + Enter)
      </button>
      {result?.oxc && (
        <>
          <label>Oxc output</label>
          <iframe
            style={{ minHeight: "250px" }}
            src={generateSourcemapVisualizerLink(
              result.oxc.code,
              JSON.stringify(result.oxc.map),
            )}
          />
        </>
      )}
      {result && (
        <>
          <label>Esbuild output</label>
          <iframe
            style={{ minHeight: "250px" }}
            src={generateSourcemapVisualizerLink(
              result.esbuild.code,
              result.esbuild.map,
            )}
          />
        </>
      )}
    </div>
  );
}

function generateSourcemapVisualizerLink(code: string, map: string) {
  const hash = btoa(`${code.length}\0${code}${map.length}\0${map}`);
  return `https://evanw.github.io/source-map-visualization/#` + hash;
}
