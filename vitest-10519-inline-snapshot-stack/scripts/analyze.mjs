import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const [directory, output] = process.argv.slice(2)
if (!directory) {
  console.error('Usage: pnpm analyze <result-directory>')
  process.exit(1)
}

const resultDirectory = resolve(directory)
const manifest = readJson(resolve(resultDirectory, 'manifest.json'))
const metrics = [
  'environmentSetupDuration',
  'prepareDuration',
  'prepareDurationPerModule',
  'setupDuration',
  'setupDurationPerModule',
  'collectDuration',
  'collectDurationPerModule',
  'testCaseDuration',
  'testCaseDurationPerTest',
  'firstTestDuration',
  'nonFirstTestDuration',
  'moduleDuration',
  'moduleDurationPerModule',
  'moduleWorkDuration',
  'moduleWorkDurationPerModule',
  'trackedDuration',
  'reporterRunDuration',
]
const variants = Object.fromEntries(manifest.variants.map((variant) => [
  variant,
  readVariant(resolve(resultDirectory, variant)),
]))

const comparisons = {
  eagerMinusLazy: subtractBySample(variants.eager, variants.lazy),
}
comparisons.eagerMinusLazyPercentOfEager = percentOf(
  comparisons.eagerMinusLazy,
  variants.eager,
)

if (variants.control) {
  comparisons.eagerMinusControl = subtractBySample(variants.eager, variants.control)
  comparisons.lazyMinusControl = subtractBySample(variants.lazy, variants.control)
  comparisons.eagerMinusControlPercentOfControl = percentOf(
    comparisons.eagerMinusControl,
    variants.control,
  )
  comparisons.lazyMinusControlPercentOfControl = percentOf(
    comparisons.lazyMinusControl,
    variants.control,
  )
}

const analysis = {
  manifest,
  metrics: Object.fromEntries([
    ...Object.entries(variants).map(([name, samples]) => [name, summarizeSamples(samples)]),
    ...Object.entries(comparisons).map(([name, samples]) => [name, summarizeSamples(samples)]),
  ]),
  samples: { ...variants, ...comparisons },
}

const serialized = `${JSON.stringify(analysis, null, 2)}\n`
if (output) {
  const outputFile = resolve(output)
  if (existsSync(outputFile)) {
    throw new Error(`Refusing to overwrite existing analysis: ${outputFile}`)
  }
  writeFileSync(outputFile, serialized)
  console.log(`Analysis written to ${outputFile}`)
}
else {
  process.stdout.write(serialized)
}

function readVariant(variantDirectory) {
  return readdirSync(variantDirectory)
    .filter(file => file.endsWith('.report.json'))
    .toSorted()
    .map((file) => {
      const report = readJson(resolve(variantDirectory, file))
      const sampleName = file.slice(0, -'.report.json'.length)
      const diagnosticReport = readJson(resolve(variantDirectory, `${sampleName}.diagnostic.json`))
      const testResults = report.testResults || []
      const moduleDiagnostics = diagnosticReport.modules.map(module => module.diagnostic)
      const testDiagnostics = diagnosticReport.modules.flatMap(module =>
        module.tests.map(test => test.diagnostic),
      )
      const firstTestDiagnostics = diagnosticReport.modules.map(module => module.tests[0]?.diagnostic)
      const nonFirstTestDiagnostics = diagnosticReport.modules.flatMap(module =>
        module.tests.slice(1).map(test => test.diagnostic),
      )
      const lastEndTime = Math.max(report.startTime, ...testResults.map(result => result.endTime))
      const sample = {
        sample: Number(sampleName),
        success: report.success,
        moduleCount: diagnosticReport.modules.length,
        prepareModuleCount: moduleDiagnostics.filter(value => value.prepareDuration > 0).length,
        testCount: report.numTotalTests,
        snapshotCount: report.snapshot?.total,
        environmentSetupDuration: sum(moduleDiagnostics.map(value => value.environmentSetupDuration)),
        prepareDuration: sum(moduleDiagnostics.map(value => value.prepareDuration)),
        setupDuration: sum(moduleDiagnostics.map(value => value.setupDuration)),
        collectDuration: sum(moduleDiagnostics.map(value => value.collectDuration)),
        testCaseDuration: sum(testDiagnostics.map(value => value?.duration || 0)),
        firstTestDuration: sum(firstTestDiagnostics.map(value => value?.duration || 0)),
        nonFirstTestDuration: sum(nonFirstTestDiagnostics.map(value => value?.duration || 0)),
        moduleDuration: sum(moduleDiagnostics.map(value => value.duration)),
        reporterRunDuration: lastEndTime - report.startTime,
      }
      sample.moduleWorkDuration = sum([
        sample.setupDuration,
        sample.collectDuration,
        sample.moduleDuration,
      ])
      sample.trackedDuration = sum([
        sample.environmentSetupDuration,
        sample.prepareDuration,
        sample.moduleWorkDuration,
      ])
      sample.testCaseDurationPerTest = sample.testCaseDuration / sample.testCount
      sample.prepareDurationPerModule = sample.prepareDuration / sample.moduleCount
      sample.setupDurationPerModule = sample.setupDuration / sample.moduleCount
      sample.collectDurationPerModule = sample.collectDuration / sample.moduleCount
      sample.moduleDurationPerModule = sample.moduleDuration / sample.moduleCount
      sample.moduleWorkDurationPerModule = sample.moduleWorkDuration / sample.moduleCount
      return sample
    })
}

function summarizeSamples(samples) {
  return Object.fromEntries(
    metrics.map((metric) => [
      metric,
      summarize(samples.map(sample => sample[metric])),
    ]),
  )
}

function subtractBySample(leftSamples, rightSamples) {
  const rightBySample = new Map(rightSamples.map(sample => [sample.sample, sample]))
  return leftSamples.map((left) => {
    const right = rightBySample.get(left.sample)
    if (!right) {
      throw new Error(`Missing comparison sample ${left.sample}`)
    }
    return Object.fromEntries([
      ['sample', left.sample],
      ...metrics.map(metric => [metric, left[metric] - right[metric]]),
    ])
  })
}

function percentOf(differences, baselines) {
  const baselineBySample = new Map(baselines.map(sample => [sample.sample, sample]))
  return differences.map((difference) => {
    const baseline = baselineBySample.get(difference.sample)
    return Object.fromEntries([
      ['sample', difference.sample],
      ...metrics.map(metric => [
        metric,
        baseline[metric] === 0 ? 0 : difference[metric] / baseline[metric] * 100,
      ]),
    ])
  })
}

function summarize(input) {
  const values = input.toSorted((a, b) => a - b)
  return {
    min: values[0],
    median: quantile(values, 0.5),
    mean: sum(values) / values.length,
    p90: quantile(values, 0.9),
    max: values.at(-1),
  }
}

function quantile(values, percentile) {
  return values[Math.ceil(values.length * percentile) - 1]
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0)
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}
