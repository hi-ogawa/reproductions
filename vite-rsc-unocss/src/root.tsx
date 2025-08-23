import './index.css' // css import is automatically injected in exported server components
import 'virtual:uno.css'
import { getServerCounter, updateServerCounter } from './action.tsx'
import { ClientCounter } from './client.tsx'

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
  )
}

function App() {
  return (
    <div id="root">
      <div className='logo'></div>
      <h1>Vite + RSC + UnoCSS</h1>
      <div className="card">
        <ClientCounter />
      </div>
      <div className="card">
        <form action={updateServerCounter.bind(null, 1)}>
          <button>Server Counter: {getServerCounter()}</button>
        </form>
      </div>
      <ul className="read-the-docs">
        <li>
          Edit <code>src/client.tsx</code> to test client HMR.
        </li>
        <li>
          Edit <code>src/root.tsx</code> to test server HMR.
        </li>
        <li>
          Visit{' '}
          <a href="/?__rsc" target="_blank">
            <code>/?__rsc</code>
          </a>{' '}
          to view RSC stream payload.
        </li>
        <li>
          Visit{' '}
          <a href="/?__nojs" target="_blank">
            <code>/?__nojs</code>
          </a>{' '}
          to test server action without js enabled.
        </li>
      </ul>
    </div>
  )
}
