'use client'

import { useState } from 'react'
import { innerAction } from './inner-action'
import { outerAction } from './outer-action'

export function NestedClient() {
  const [result, setResult] = useState('none')

  async function run() {
    try {
      setResult(await outerAction(innerAction))
    } catch (error) {
      setResult(`ERROR: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div>
      <button onClick={run}>Run outer action with inner action</button>
      <p data-testid="nested-control-result">{result}</p>
    </div>
  )
}
