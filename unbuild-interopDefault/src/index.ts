let babel: typeof import('@babel/core') | undefined
async function loadBabel() {
  for (let i = 0; i < 1000_000; i++) {
    await Promise.resolve();
  };
  console.log("[start]", new Error("").stack?.split("\n").slice(1, 6))
  if (!babel) {
    babel = await import('@babel/core').then(babel => {
      console.log("[end] [babel.transform]", babel.transform, new Error("").stack?.split("\n").slice(1, 6))
      if (!babel.transform) {
        throw new Error("babel", { cause: babel })
      }
      return babel;
    })
  }
  return babel
}

async function main() {
  await Promise.all(
    [...Array(5)].map(async () => loadBabel())
  )
}

main()

export {}
