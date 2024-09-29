import React from "react";
import ReactDomClient from "react-dom/client";
import { App } from "./repro/app";

ReactDomClient.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
