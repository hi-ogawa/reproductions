import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ul>
          <li>
            <Link href="/" prefetch={false}>Home</Link>
          </li>
          <li>
            <Link href="/other" prefetch={false}>Other</Link>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
