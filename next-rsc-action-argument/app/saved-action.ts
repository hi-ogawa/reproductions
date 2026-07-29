'use client'

export type SavedAction = () => Promise<string>

let savedAction: SavedAction | undefined

export function saveAction(action: SavedAction) {
  savedAction = action
}

export function getSavedAction() {
  return savedAction
}
