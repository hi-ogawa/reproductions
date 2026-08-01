// import chalk from "npm:chalk@5";
// import { assertEquals } from "jsr:@std/assert@^1.0.0";
// import chalk from "chalk";
import { assertEquals } from "@std/assert";

// console.log(chalk.yellow("Hello world"));

try {
  assertEquals(1, 2);
} catch (e) {
  console.error(e);
}
