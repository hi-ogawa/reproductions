import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <h1>Callable use cache form reload repro</h1>
      <ul>
        <li>
          <Link href="/inline">Inline directive</Link>
        </li>
        <li>
          <Link href="/file">File directive</Link>
        </li>
      </ul>
    </main>
  )
}
