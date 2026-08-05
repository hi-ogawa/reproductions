import { connection } from 'next/server'
import { FileDirective } from './server'

export const instant = false

export default async function Page() {
  await connection()
  return <FileDirective />
}
