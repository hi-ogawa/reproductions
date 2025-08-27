"use client";

import React from "react";

export function TestClient1() {
  return <div>client1: {String(!!React.useState)}</div>;
}
