'use client'

import { saveAction } from '../saved-action'
import { actionA } from './actions'

export function ClientA() {
  return <button onClick={() => saveAction(actionA)}>Save action A</button>
}
