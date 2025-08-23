import "virtual:uno.css";
import { getServerCounter, updateServerCounter } from "./action.tsx";
import { ClientCounter } from "./client.tsx";

export function Root() {
  return (
    <html lang="en" className="font-sans">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body className="m-0 flex place-items-center min-w-80 min-h-screen">
        <App />
      </body>
    </html>
  );
}

function App() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="i-logos-react w-24 h-24 transform transition-transform duration-700 hover:rotate-180"></div>
      <h1 className="text-5xl leading-tight">Vite + RSC + UnoCSS</h1>
      <div className="p-4">
        <ClientCounter />
      </div>
      <div className="p-4">
        <form action={updateServerCounter.bind(null, 1)}>
          <button className="btn">Server Counter: {getServerCounter()}</button>
        </form>
      </div>
      <ul className="text-gray-500 text-left">
        <li>
          Edit <code>src/client.tsx</code> to test client HMR.
        </li>
        <li>
          Edit <code>src/root.tsx</code> to test server HMR.
        </li>
        <li>
          Visit{" "}
          <a href="/?__rsc" target="_blank" className="link">
            <code>/?__rsc</code>
          </a>{" "}
          to view RSC stream payload.
        </li>
        <li>
          Visit{" "}
          <a href="/?__nojs" target="_blank" className="link">
            <code>/?__nojs</code>
          </a>{" "}
          to test server action without js enabled.
        </li>
      </ul>
    </div>
  );
}
