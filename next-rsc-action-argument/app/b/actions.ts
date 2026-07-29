'use server'

import type { SavedAction } from '../saved-action'

export async function actionB(action: SavedAction) {
  return `ACTION_B_OK(${await action()})`
}
