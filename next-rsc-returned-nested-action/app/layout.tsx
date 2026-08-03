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
              <Link href="/imported">Client import</Link>
            </li>
            <li>
              <Link href="/prop">Server Component prop</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
