import { writeFileSync } from 'node:fs'

export default class DiagnosticReporter {
  onTestRunEnd(testModules, unhandledErrors, reason) {
    const outputFile = process.env.BENCH_DIAGNOSTIC_FILE
    if (!outputFile) {
      throw new Error('BENCH_DIAGNOSTIC_FILE is required')
    }

    const report = {
      reason,
      unhandledErrors,
      modules: testModules.map(module => ({
        moduleId: module.moduleId,
        relativeModuleId: module.relativeModuleId,
        state: module.state(),
        diagnostic: module.diagnostic(),
        tests: [...module.children.allTests()].map(test => ({
          id: test.id,
          name: test.name,
          fullName: test.fullName,
          state: test.result().state,
          diagnostic: test.diagnostic(),
        })),
      })),
    }

    writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`)
  }
}
