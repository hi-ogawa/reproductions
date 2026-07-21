"use client";

// Client component imports only the plain export from a module that also
// happens to contain an inline "use server" action. This pulls `shared.jsx`
// into the client graph via a non-action import.
import { pageTitle } from "./shared";

export function TestClient() {
  return <div>Client sees: {pageTitle}</div>;
}
