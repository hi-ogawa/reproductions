import { defineConfig } from 'astro/config';

// @ts-ignore
import testDepCjs from "test-dep-cjs";
console.log(testDepCjs);

// https://astro.build/config
export default defineConfig({});
