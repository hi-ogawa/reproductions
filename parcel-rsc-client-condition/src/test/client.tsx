"use client";

// @ts-ignore
import node from "@vitejs/test-dep/node"
// @ts-ignore
import browser from "@vitejs/test-dep/browser"

export function TestClientComponent() {
  // this shows { node: false, browser: true } both on CSR and SSR.
  console.log("[testDep]", { node, browser })
  return <div className="test">client-component: {JSON.stringify({ node, browser })}</div>;
}
