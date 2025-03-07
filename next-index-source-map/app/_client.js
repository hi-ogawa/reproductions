"use client"

import clientDep from "./_client-dep.js"

export default function TestClient() {
  clientDep()
  return <div>TestClient</div>
}
