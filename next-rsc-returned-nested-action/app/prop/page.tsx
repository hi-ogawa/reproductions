import { outer } from './actions'
import { PropRepro } from './client'

export default function Page() {
  return (
    <main>
      <h1>Server Component prop</h1>
      <PropRepro outer={outer} />
    </main>
  )
}
