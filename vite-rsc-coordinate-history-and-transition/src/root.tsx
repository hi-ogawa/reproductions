import './index.css' // css import is automatically injected in exported server components
import { getServerCounter, updateServerCounter } from './action.tsx'
import { ClientCounter } from './client.tsx'

export function Root(props: { url: URL }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <App {...props} />
      </body>
    </html>
  )
}

function App(props: { url: URL }) {
  return (
    <div id="root">
      <h1>Vite + RSC</h1>
      <div className="card">
        <ClientCounter />
      </div>
      <div className="card">
        <form action={updateServerCounter.bind(null, 1)}>
          <button>Server Counter: {getServerCounter()}</button>
        </form>
      </div>
      <div>
        <div>url: {props.url.href}</div>
        <div>
          <a href="/">Home</a> | <a href="/fast">Fast</a> |{' '}
          <a href="/slow">Slow</a>
        </div>
        <div>
          <Sleep
            ms={
              props.url.pathname === '/slow'
                ? 2000
                : props.url.pathname === '/fast'
                  ? 500
                  : 0
            }
          />
        </div>
      </div>
    </div>
  )
}

async function Sleep(props: { ms: number }) {
  console.log('sleep:start', props.ms, 'ms')
  await new Promise((resolve) => setTimeout(resolve, props.ms))
  console.log('sleep:end', props.ms, 'ms')
  return <>Slept for {props.ms}ms</>
}
