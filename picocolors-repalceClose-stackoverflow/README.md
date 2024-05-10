https://github.com/vitest-dev/vitest/issues/5614

```sh
$ node repro.mjs
/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:22
        let start = string.substring(0, index) + replace
                           ^

RangeError: Maximum call stack size exceeded
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:22:21)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)
    at replaceClose (/home/hiroshi/code/personal/reproductions/picocolors-repalceClose-stackoverflow/node_modules/picocolors/picocolors.js:25:30)

Node.js v20.12.2
```
