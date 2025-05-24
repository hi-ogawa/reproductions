import Link from "next/link";

// js split  [no]
// css split [no]
// import { TestClient } from "./client";

export default async function Page({ searchParams }) {
  // js split  [no]
  // css split [no]
  const { TestClient } = await import("./client")

  return (
    <div style={{ border: "1px solid blue", padding: "20px" }}>
      <h4>Page</h4>[<Link href="/">show</Link> |{" "}
      <Link href="/?hide=1">hide</Link>]
      {(await searchParams).hide ? null : <TestClient />}
    </div>
  );
}
