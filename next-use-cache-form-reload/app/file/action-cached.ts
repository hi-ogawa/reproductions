'use cache'

import { cacheTag } from 'next/cache'
import { readState, writeState } from './state'

export async function cachedAction(formData: FormData) {
  cacheTag('file-form-reload')
  process.stdout.write(`/file cachedAction ${JSON.stringify([...formData])}\n`)
  const message = String(formData.get('message'))
  const state = readState()
  state.executionCount++
  state.result = `file + ${message}`
  writeState(state)
}
