"use client";

import React from "react";

export function TestClient() {
  return <div>other-client: {String(!!React.useState)}</div>;
}
