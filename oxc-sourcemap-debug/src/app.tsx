import React from "react";
import type { TransformResult } from "rolldown/experimental";

export function App() {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState<TransformResult>();

  const handleSubmit = () =>
    React.startTransition(async () => {
      const res = await fetch("/api/oxc?input=" + encodeURIComponent(input));
      if (res.ok) {
        const result = await res.json();
        setResult(result);
      } else {
        alert("'/api/oxc' failed\n" + (await res.text()));
      }
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h4>Oxc transform source map debugger</h4>
      <form
        action={async () => {
          const res = await fetch(
            "/api/oxc?input=" + encodeURIComponent(input),
          );
          if (res.ok) {
            const result = await res.json();
            console.log(result);
          }
        }}
      >
        <label>
          Input <br />
          <textarea
            rows={20}
            cols={80}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </label>
      </form>
      <label>
        Output{" "}
        {result?.map && (
          <a
            href={generateSourcemapVisualizerLink(result.code, result.map)}
            target="_blank"
          >
            (source map)
          </a>
        )}
        <br />
        <textarea rows={20} cols={80} readOnly value={result?.code} />
      </label>
    </div>
  );
}

function generateSourcemapVisualizerLink(code: string, map: unknown) {
  const mapJson = JSON.stringify(map);
  const hashRaw = `${code.length}\0${code}${mapJson.length}\0${mapJson}`;
  const hash = btoa(hashRaw);
  return `https://evanw.github.io/source-map-visualization/#` + hash;
}
