import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h4>Layout</h4>
          <ul>
            <li>
              <Link href="/">/</Link>
            </li>
            <li>
              <Link href="/other">/other</Link>
            </li>
          </ul>
          {children}
        </div>
      </body>
    </html>
  );
}
