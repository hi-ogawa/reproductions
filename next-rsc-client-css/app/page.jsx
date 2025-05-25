import Link from "next/link";
import { TestClient } from "./client";

export default async function Page({ searchParams }) {
  return (
    <div style={{ border: "1px solid blue", padding: "20px" }}>
      <h4>Page</h4>[<Link href="/">show</Link> |{" "}
      <Link href="/?hide=1">hide</Link>]
      {(await searchParams).hide ? null : <TestClient />}
    </div>
  );
}
