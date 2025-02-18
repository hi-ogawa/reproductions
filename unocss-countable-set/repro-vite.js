async function main() {
  const { createServer } = await import(process.argv[2])
  const server = await createServer({ configFile: false })
  await server.ssrLoadModule("/repro.ts")
  await server.close();
}

main()
