import { cacheTag } from 'next/cache'
import { rerenderPageAction, resetCacheAction } from './action'
import { InlineDirectiveClient } from './client'
import { readState, writeState } from './state'

export function InlineDirective() {
  const captured = 'captured'

  async function cachedAction(formData: FormData) {
    'use cache'
    cacheTag('inline-form-reload')
    process.stdout.write(
      `/inline cachedAction ${JSON.stringify([...formData])}\n`,
    )
    const message = String(formData.get('message'))
    const state = readState()
    state.executionCount++
    state.result = `${captured} + ${message}`
    writeState(state)
  }

  const state = readState()
  return (
    <>
      <InlineDirectiveClient
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
