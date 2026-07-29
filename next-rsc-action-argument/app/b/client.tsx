'use client'

import { useState } from 'react'
import { getSavedAction } from '../saved-action'
import { actionB } from './actions'

export function ClientB() {
  const [directResult, setDirectResult] = useState('none')
  const [nestedResult, setNestedResult] = useState('none')
  const savedAction = getSavedAction()

  async function runDirect() {
    if (!savedAction) return
    try {
      setDirectResult(await savedAction())
    } catch (error) {
      setDirectResult(
        `ERROR: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  async function runNested() {
    if (!savedAction) return
    try {
      setNestedResult(await actionB(savedAction))
    } catch (error) {
      setNestedResult(
        `ERROR: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  return (
    <div>
      <button disabled={!savedAction} onClick={runDirect}>
        Run saved action A directly
      </button>
      <p data-testid="direct-result">{directResult}</p>
      <button disabled={!savedAction} onClick={runNested}>
        Run action B with saved action A
      </button>
      <p data-testid="nested-result">{nestedResult}</p>
    </div>
  )
}
