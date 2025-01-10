import FakeTimers from "@sinonjs/fake-timers";

const tmpDate = Date;
const tmpPerformance = performance;

FakeTimers.install();

console.log('tmpDate.now === Date.now', tmpDate.now === Date.now)
console.log('tmpDate.now()', tmpDate.now())
console.log('Date.now()', Date.now())

console.log('tmpPerformance.now === performance.now', tmpPerformance.now === performance.now)
console.log('tmpPerformance.now()', tmpPerformance.now())
console.log('performance.now()', performance.now())
