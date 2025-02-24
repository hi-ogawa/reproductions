import { minify } from 'oxc-minify'

console.log(minify('test.js', 'f("o" + "k")'))
