import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const [name, fileCountInput, casesPerFileInput, kind = 'snapshot'] = process.argv.slice(2)
const fileCount = Number(fileCountInput)
const casesPerFile = Number(casesPerFileInput)

if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name || '')
  || !Number.isInteger(fileCount)
  || fileCount < 1
  || !Number.isInteger(casesPerFile)
  || casesPerFile < 1
  || !['snapshot', 'control'].includes(kind)) {
  console.error('Usage: pnpm generate-workload <name> <file-count> <cases-per-file> [snapshot|control]')
  process.exit(1)
}

const directory = resolve('workloads', 'generated', name)
if (existsSync(directory)) {
  console.error(`Refusing to overwrite existing workload: ${directory}`)
  process.exit(1)
}

mkdirSync(directory, { recursive: true })

for (let fileIndex = 0; fileIndex < fileCount; fileIndex++) {
  const tests = Array.from({ length: casesPerFile }, (_, caseIndex) => {
    const value = fileIndex * casesPerFile + caseIndex
    const assertion = kind === 'snapshot'
      ? `expect(${value}).toMatchInlineSnapshot(\`${value}\`)`
      : `expect(${value}).toBe(${value})`
    return `test('case ${value}', () => {
  ${assertion}
})`
  }).join('\n\n')

  const filename = `${String(fileIndex).padStart(3, '0')}.test.ts`
  writeFileSync(
    resolve(directory, filename),
    `import { expect, test } from 'vitest'\n\n${tests}\n`,
  )
}

writeFileSync(resolve(directory, 'workload.json'), `${JSON.stringify({
  schemaVersion: 1,
  name,
  fileCount,
  casesPerFile,
  totalCases: fileCount * casesPerFile,
  kind,
}, null, 2)}\n`)

console.log(`Generated ${fileCount} files and ${fileCount * casesPerFile} cases in ${directory}`)
