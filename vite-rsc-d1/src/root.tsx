import "./index.css"; // css import is automatically injected in exported server components
import { getServerCounter, updateServerCounter } from "./action.tsx";
import { ClientCounter } from "./client.tsx";

export function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}

function App() {
  return (
    <div id="root">
      <div className="card">
        <p>Server Counter: {getServerCounter()}</p>
        <form>
          <button
            formAction={async () => {
              "use server";
              await updateServerCounter(-1);
            }}
          >
            -1
          </button>{" "}
          <button
            formAction={async () => {
              "use server";
              await updateServerCounter(1);
            }}
          >
            +1
          </button>
        </form>
      </div>
      <div className="card">
        <ClientCounter />
      </div>
      <ul className="read-the-docs">
        <li>
          Visit{" "}
          <a href="/?__rsc" target="_blank">
            <code>/?__rsc</code>
          </a>{" "}
          to view RSC stream payload.
        </li>
        <li>
          Visit{" "}
          <a href="/?__nojs" target="_blank">
            <code>/?__nojs</code>
          </a>{" "}
          to test server action without js enabled.
        </li>
      </ul>
    </div>
  );
}
