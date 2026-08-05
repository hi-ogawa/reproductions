import { rerenderPageAction, resetCacheAction } from './action'
import { cachedAction } from './action-cached'
import { FileDirectiveClient } from './client'
import { readState } from './state'

export function FileDirective() {
  const state = readState()
  return (
    <>
      <FileDirectiveClient
        action={cachedAction}
        executionCount={state.executionCount}
        result={state.result}
      />
      <form action={resetCacheAction}>
        <button>Reset cache</button>
      </form>
      <form action={rerenderPageAction}>
        <button>Re-render page</button>
      </form>
    </>
  )
}
