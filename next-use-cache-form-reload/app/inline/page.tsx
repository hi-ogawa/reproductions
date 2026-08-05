import { connection } from 'next/server'
import { InlineDirective } from './server'

export const instant = false

export default async function Page() {
  await connection()
  return <InlineDirective />
}
