import { Bench } from 'tinybench'
import { x, y, refX, refY, assignY } from './test.js';
// import * as dep from './test.js';

const bench = new Bench()

bench
  .add('x', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += x
    }
  })
  .add('y', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += y
    }
  })
  .add('x/refX', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += x
      refX(0)
    }
  })
  .add('x/refY', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += x
      refY(0)
    }
  })
  .add('y/refX', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += y
      refX(0)
    }
  })
  .add('y/refY', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += y
      refY(0)
    }
  })
  .add('y/assignY', () => {
    let result = 0;
    for (let i = 0; i < 1000_000; i++) {
      result += y
      assignY(0)
    }
  })
  // .add('refY', () => {
  //   let result = 0;
  //   for (let i = 0; i < 1000_000; i++) {
  //     result += y
  //     refY(0)
  //   }
  // })
  // .add('namespace.x', () => {
  //   let result = 0;
  //   for (let i = 0; i < 1000_000; i++) {
  //     result += dep.x
  //   }
  // })
  // .add('namespace.y', () => {
  //   let result = 0;
  //   for (let i = 0; i < 1000_000; i++) {
  //     result += dep.y
  //   }
  // })

await bench.run()

console.table(bench.table())
