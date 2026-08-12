import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const [label, runtime, coverage, samplesInput = '5', ...fileArguments] = process.argv.slice(2)
const samples = Number(samplesInput)
const controlSeparator = fileArguments.indexOf('--control')
const files = controlSeparator === -1 ? fileArguments : fileArguments.slice(0, controlSeparator)
const controlFiles = controlSeparator === -1 ? [] : fileArguments.slice(controlSeparator + 1)

if (!/^[a-z0-9][a-z0-9._-]*$/i.test(label || '')
  || !['node', 'browser'].includes(runtime)
  || !['off', 'on'].includes(coverage)
  || !Number.isInteger(samples)
  || samples < 1
  || files.length === 0
  || (controlSeparator !== -1 && controlFiles.length === 0)) {
  console.error('Usage: pnpm run-results <label> <node|browser> <off|on> <samples> <snapshot-file...> [--control <control-file...>]')
  process.exit(1)
}

const resultDirectory = resolve('results', label, `${runtime}-${coverage}`)
if (existsSync(resultDirectory)) {
  console.error(`Refusing to overwrite existing results: ${resultDirectory}`)
  process.exit(1)
}

const variants = controlFiles.length > 0 ? ['control', 'eager', 'lazy'] : ['eager', 'lazy']
for (const variant of variants) {
  mkdirSync(resolve(resultDirectory, variant), { recursive: true })
}

const vitest = new URL('../node_modules/vitest/vitest.mjs', import.meta.url)
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

for (let sample = 1; sample <= samples; sample++) {
  const orderedVariants = rotate(variants, (sample - 1) % variants.length)
  for (const variant of orderedVariants) {
    const sampleName = String(sample).padStart(3, '0')
    const outputFile = resolve(
      resultDirectory,
      variant,
      `${sampleName}.report.json`,
    )
    const diagnosticFile = resolve(resultDirectory, variant, `${sampleName}.diagnostic.json`)
    const result = spawnSync(
      process.execPath,
      [
        vitest.pathname,
        'run',
        ...(variant === 'control' ? controlFiles : files),
        '--config',
        'vitest.config.ts',
        '--reporter=json',
        '--reporter=./scripts/diagnostic-reporter.mjs',
        `--outputFile=${outputFile}`,
      ],
      {
        cwd: new URL('..', import.meta.url),
        env: {
          ...process.env,
          BENCH_VARIANT: variant,
          BENCH_RUNTIME: runtime,
          BENCH_COVERAGE: coverage,
          BENCH_DIAGNOSTIC_FILE: diagnosticFile,
        },
        stdio: 'inherit',
      },
    )
    if (result.status !== 0) {
      throw new Error(`Sample ${sample} variant ${variant} failed with status ${result.status}`)
    }
  }
}

writeFileSync(resolve(resultDirectory, 'manifest.json'), `${JSON.stringify({
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  label,
  runtime,
  coverage,
  samples,
  files,
  controlFiles,
  variants,
  includeTaskLocation: process.env.BENCH_TASK_LOCATION === 'on',
  ci: !!process.env.CI,
  platform: process.platform,
  architecture: process.arch,
  node: process.version,
  packages: packageJson.devDependencies,
  inputs: Object.fromEntries([
    'vitest.config.ts',
    'scripts/diagnostic-reporter.mjs',
    'patches/@vitest__snapshot@4.1.10.patch',
    ...files,
    ...controlFiles,
  ].map(file => [file, sha256(resolve(file))])),
}, null, 2)}\n`)

console.log(`Results written to ${resultDirectory}`)

function sha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex')
}

function rotate(values, offset) {
  return [...values.slice(offset), ...values.slice(0, offset)]
}
