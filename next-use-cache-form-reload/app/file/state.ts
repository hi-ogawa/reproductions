import fs from 'node:fs'
import path from 'node:path'

export type State = {
  executionCount: number
  result: string
}

const statePath = path.join(process.cwd(), '.tmp', 'file-state.json')

export function readState(): State {
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8')) as State
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { executionCount: 0, result: 'not called' }
    }
    throw error
  }
}

export function writeState(state: State) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true })
  fs.writeFileSync(statePath, JSON.stringify(state))
}

export function resetState() {
  fs.rmSync(statePath, { force: true })
}
