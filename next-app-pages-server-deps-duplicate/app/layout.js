import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/app-router">App</Link>
          </li>
          <li>
            <Link href="/pages-router">Pages</Link>
          </li>
        </ul>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
