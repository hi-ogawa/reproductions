'use server'

import { db } from './db'

export async function getServerCounter() {
  const counter = await db.counter.findUnique({
    where: { id: 1 }
  })
  
  if (!counter) {
    const newCounter = await db.counter.create({
      data: { id: 1, value: 0 }
    })
    return newCounter.value
  }
  
  return counter.value
}

export async function updateServerCounter(change: number) {
  const counter = await db.counter.upsert({
    where: { id: 1 },
    update: { value: { increment: change } },
    create: { id: 1, value: change }
  })
  
  return counter.value
}
