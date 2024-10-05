export interface SomeTs {
  x: 0;
}

function throwError() {
  throwError2();
}

function throwError2() {
  throw new Error("boom");
}

function main() {
  try {
    throwError();
  } catch (e) {
    console.log(e);
  }
}

main();
