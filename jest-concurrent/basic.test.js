const { describe, test } = require("@jest/globals");

let now = Date.now();
const diff = () => {
  const prev = now;
  now = Date.now();
  return now - prev;
};

const sleep = async (ms, name) => {
  process.stdout.write(`🏁 ${name} (+${diff()})\n`);
  await new Promise((resolve) => setTimeout(resolve, ms));
  process.stdout.write(`👍 ${name} (+${diff()})\n`);
};

describe("d1", () => {
  test("t1", async () => {
    await sleep(500, "d1-t1");
  });
});

describe("d2", () => {
  test("t1", async () => {
    await sleep(500, "d2-t1");
  });

  test.concurrent("t2-c", async () => {
    await sleep(500, "d2-t2-c");
  });

  test.concurrent("t3-c", async () => {
    await sleep(500, "d2-t3-c");
  });
});

describe("d3", () => {
  test("t1", async () => {
    await sleep(500, "d3-t1");
  });

  test.concurrent("t2-c", async () => {
    await sleep(500, "d3-t2-c");
  });

  describe("d4", () => {
    test.concurrent("t1-c", async () => {
      await sleep(500, "d3-d4-t1-c");
    });
  })
});
