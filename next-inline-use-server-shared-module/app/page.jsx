import { TestClient } from "./client";
import { InlinePage } from "./shared";

export default function Home() {
  return (
    <div>
      <div>Home</div>
      {/* Server Component usage: renders the inline "use server" action */}
      <InlinePage />
      {/* Client Component usage: imports the plain `pageTitle` export */}
      <TestClient />
    </div>
  );
}
