import Link from 'next/link'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> |{' '}
          <Link href="/inline">Inline directive</Link> |{' '}
          <Link href="/file">File directive</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
