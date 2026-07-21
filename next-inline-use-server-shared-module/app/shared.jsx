// No "use client", no top-level "use server".
// Plain module that (a) renders as a Server Component containing an inline
// "use server" action, and (b) also exports a plain value consumed elsewhere.

export const pageTitle = "Shared";

export function InlinePage() {
  async function invoke() {
    "use server";
    console.log("boom");
  }
  return (
    <form action={invoke}>
      <button type="submit">Invoke</button>
    </form>
  );
}
