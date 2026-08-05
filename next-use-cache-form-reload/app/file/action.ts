'use server'

import { refresh, updateTag } from 'next/cache'
import { resetState } from './state'

export async function resetCacheAction() {
  updateTag('file-form-reload')
  resetState()
}

export async function rerenderPageAction() {
  refresh()
}
