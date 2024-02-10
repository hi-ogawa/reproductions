import * as paper from 'paper/dist/paper-core';
import paper2 from 'paper/dist/paper-core';

console.log([
  paper.Color,
  paper.__proto__,
  paper.__proto__.Color,
  paper2.Color,
  paper2.__proto__,
  paper2.__proto__.Color
])
