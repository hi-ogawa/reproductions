import Link from "next/link"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/">[/]</Link>
          <Link href="/cjs">[/cjs]</Link>
          <Link href="/cjs2">[/cjs2]</Link>
          <Link href="/context">[/context]</Link>
          <Link href="/context2">[/context2]</Link>
          <Link href="/context3">[/context3]</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
