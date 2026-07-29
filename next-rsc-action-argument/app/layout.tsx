import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/a">Page A</Link>
            </li>
            <li>
              <Link href="/b">Page B</Link>
            </li>
            <li>
              <Link href="/nested">Nested control</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
