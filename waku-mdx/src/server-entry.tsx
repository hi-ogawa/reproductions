/// <reference types="vite/client" />
import { unstable_fsRouter } from "waku/router/server";

export default unstable_fsRouter(
  import.meta.glob("/src/pages/**/*.{mdx,js,jsx,ts,tsx}", {
    base: "/src/pages",
  }),
  {
    apiDir: "api",
    slicesDir: "_slices",
  },
);
