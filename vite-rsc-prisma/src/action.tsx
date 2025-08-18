'use server'

import { prisma } from './db'

export async function getServerCounter() {
  const counter = await prisma.counter.findUnique({
    where: { id: 1 }
  })
  
  if (!counter) {
    const newCounter = await prisma.counter.create({
      data: { id: 1, value: 0 }
    })
    return newCounter.value
  }
  
  return counter.value
}

export async function updateServerCounter(change: number) {
  const counter = await prisma.counter.upsert({
    where: { id: 1 },
    update: { value: { increment: change } },
    create: { id: 1, value: change }
  })
  
  return counter.value
}
