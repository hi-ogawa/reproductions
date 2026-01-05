import Link from "next/link";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div>Layout</div>
        <ul>
          <li>
            <Link href="/">/</Link>
          </li>
          <li>
            <Link href="/test-action">/test-action</Link>
          </li>
          <li>
            <Link href="/test-other" prefetch={false}>
              /test-other
            </Link>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
