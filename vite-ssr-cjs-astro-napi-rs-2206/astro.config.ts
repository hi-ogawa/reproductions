import { defineConfig } from 'astro/config';

// @ts-ignore
import testDepCjs from "test-dep-cjs";
console.log(testDepCjs);

// workaround is to use `createRequire`
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// console.log(require("test-dep-cjs"))

// https://astro.build/config
export default defineConfig({});
