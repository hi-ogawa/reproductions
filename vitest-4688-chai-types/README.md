https://github.com/vitest-dev/vitest/issues/4688

After https://github.com/vitest-dev/vitest/pull/7937

```sh
$ pnpm exec tsc
```

Before

```sh
$ pnpm exec tsc

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:5:14 - error TS2300: Duplicate identifier 'Message'.

5         type Message = string | (() => string);
               ~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:5:14
    5         type Message = string | (() => string);
                   ~~~~~~~
    'Message' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:6:14 - error TS2300: Duplicate identifier 'ObjectProperty'.

6         type ObjectProperty = string | symbol | number;
               ~~~~~~~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:6:14
    6         type ObjectProperty = string | symbol | number;
                   ~~~~~~~~~~~~~~
    'ObjectProperty' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:79:14 - error TS2300: Duplicate identifier 'ChaiPlugin'.

79         type ChaiPlugin = (chai: ChaiStatic, utils: ChaiUtils) => void;
                ~~~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:79:14
    79         type ChaiPlugin = (chai: ChaiStatic, utils: ChaiUtils) => void;
                    ~~~~~~~~~~
    'ChaiPlugin' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:106:14 - error TS2300: Duplicate identifier 'AssertionArgs'.

106         type AssertionArgs = [
                 ~~~~~~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:106:14
    106         type AssertionArgs = [
                     ~~~~~~~~~~~~~
    'AssertionArgs' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:146:21 - error TS2300: Duplicate identifier 'Operator'.

146         export type Operator = string; // "==" | "===" | ">" | ">=" | "<" | "<=" | "!=" | "!==";
                        ~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:146:21
    146         export type Operator = string; // "==" | "===" | ">" | ">=" | "<" | "<=" | "!=" | "!==";
                            ~~~~~~~~
    'Operator' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:148:21 - error TS2300: Duplicate identifier 'OperatorComparable'.

148         export type OperatorComparable = boolean | null | number | string | undefined | Date;
                        ~~~~~~~~~~~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:148:21
    148         export type OperatorComparable = boolean | null | number | string | undefined | Date;
                            ~~~~~~~~~~~~~~~~~~
    'OperatorComparable' was also declared here.

node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:2131:22 - error TS2300: Duplicate identifier 'AssertionError'.

2131         export class AssertionError {
                          ~~~~~~~~~~~~~~

  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:2099:22
    2099         export class AssertionError {
                              ~~~~~~~~~~~~~~
    'AssertionError' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:5:14 - error TS2300: Duplicate identifier 'Message'.

5         type Message = string | (() => string);
               ~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:5:14
    5         type Message = string | (() => string);
                   ~~~~~~~
    'Message' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:6:14 - error TS2300: Duplicate identifier 'ObjectProperty'.

6         type ObjectProperty = string | symbol | number;
               ~~~~~~~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:6:14
    6         type ObjectProperty = string | symbol | number;
                   ~~~~~~~~~~~~~~
    'ObjectProperty' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:79:14 - error TS2300: Duplicate identifier 'ChaiPlugin'.

79         type ChaiPlugin = (chai: ChaiStatic, utils: ChaiUtils) => void;
                ~~~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:79:14
    79         type ChaiPlugin = (chai: ChaiStatic, utils: ChaiUtils) => void;
                    ~~~~~~~~~~
    'ChaiPlugin' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:106:14 - error TS2300: Duplicate identifier 'AssertionArgs'.

106         type AssertionArgs = [
                 ~~~~~~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:106:14
    106         type AssertionArgs = [
                     ~~~~~~~~~~~~~
    'AssertionArgs' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:146:21 - error TS2300: Duplicate identifier 'Operator'.

146         export type Operator = string; // "==" | "===" | ">" | ">=" | "<" | "<=" | "!=" | "!==";
                        ~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:146:21
    146         export type Operator = string; // "==" | "===" | ">" | ">=" | "<" | "<=" | "!=" | "!==";
                            ~~~~~~~~
    'Operator' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:148:21 - error TS2300: Duplicate identifier 'OperatorComparable'.

148         export type OperatorComparable = boolean | null | number | string | undefined | Date;
                        ~~~~~~~~~~~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:148:21
    148         export type OperatorComparable = boolean | null | number | string | undefined | Date;
                            ~~~~~~~~~~~~~~~~~~
    'OperatorComparable' was also declared here.

node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:2099:22 - error TS2300: Duplicate identifier 'AssertionError'.

2099         export class AssertionError {
                          ~~~~~~~~~~~~~~

  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:2131:22
    2131         export class AssertionError {
                              ~~~~~~~~~~~~~~
    'AssertionError' was also declared here.


Found 14 errors in 2 files.

Errors  Files
     7  node_modules/.pnpm/@types+chai@5.2.2/node_modules/@types/chai/index.d.ts:5
     7  node_modules/.pnpm/@vitest+expect@3.1.3/node_modules/@vitest/expect/dist/chai.d.cts:5
```
