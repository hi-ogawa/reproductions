export interface TsStutff {
  x: 0;
  y: 1;
}

async function main() {
  try {
    throw new Error("boom");
  } catch (e) {
    console.error(e);
  }
}

main();
