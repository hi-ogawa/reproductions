import { outer } from './actions'
import { PropRepro } from './repro'

export default function Page() {
  return (
    <main>
      <h1>Server Component prop</h1>
      <PropRepro outer={outer} />
    </main>
  )
}
