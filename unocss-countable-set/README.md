`CountableSet` defined in https://github.com/unocss/unocss/blob/0a32090ddf452ef78ad5bedb6d5e888a161fefc9/packages-engine/core/src/utils/countable-set.ts
breaks when `compilerOptions.useDefineForClassFields: true`. With OXC, it's also broken when `useDefineForClassFields: false`.

```sh
$ node repro-vite.js vite
CountableSet(1) [Set] { 'foo', _map: Map(1) { 'foo' => 1 } }

$ node repro-vite.js rolldown-vite
target was modified to include ES2021 because useDefineForClassFields is set to false and oxc does not support transforming useDefineForClassFields=false for ES2022+ yet
CountableSet(1) [Set] { 'foo', _map: Map(0) {} }

$ npx tsx repro.ts
CountableSet(1) [Set] { 'foo', _map: Map(1) { 'foo' => 1 } }

$ npx ts-node repro.ts
CountableSet(1) [Set] { 'foo', _map: Map(1) { 'foo' => 1 } }

# also broken with strip types
$ node --experimental-strip-types repro.ts
CountableSet(1) [Set] { 'foo', _map: Map(0) {} }

$ node repro-oxc.js
==== output ====
class CountableSet extends Set {
        constructor(values) {
                super(values);
                this._map = void 0;
                this._map ?? (this._map = new Map());
        }
        add(key) {
                this._map ?? (this._map = new Map());
                this._map.set(key, (this._map.get(key) ?? 0) + 1);
                return super.add(key);
        }
}
console.log(new CountableSet(["foo"]));
```

## references

- [typescript playground](https://www.typescriptlang.org/play/?target=7#code/MYGwhgzhAEDCD2BXAdgFzAIxAUwMrdQB4BpAPmmwA9VtkATGfIs6AbwChpoB9AWzAAOALmgBZQSQA00ZIl4ZsAJ1LtO0YPGQRUixMFTxFACgBuYEImwQA-CICSNRZhwlSASjZquERAKWnzSwg3L2hUAAsASwgAOj5BaGtrAF4ZbAB3MUEjEK4AX1UuMDo6IwBrbABPEWIPDi4uCOi4-gFElLTM8QEc0KbY+IEYiAJyqukjfpbBGIBzUYrKjyToAAYPAGpoAEZchsUCREVkaB8-RRji0sW9goL2DS14HBiQeFmjZAy4JDRnPFGAG0AEQAM3g8GBAF03G4gA)
- [esbuild try](https://esbuild.github.io/try/#dAAwLjI0LjAAewogIGxvYWRlcjogJ3RzJywKICB0YXJnZXQ6ICdlczIwMjAnLAogIHRzY29uZmlnUmF3OiB7CiAgICBjb21waWxlck9wdGlvbnM6IHsKICAgICAgdGFyZ2V0OiAnZXMyMDIwJywKICAgICAgdXNlRGVmaW5lRm9yQ2xhc3NGaWVsZHM6IGZhbHNlLAogICAgfSwKICB9LAp9AGNsYXNzIENvdW50YWJsZVNldDxLPiBleHRlbmRzIFNldDxLPiB7CiAgX21hcDogTWFwPEssIG51bWJlcj4KCiAgY29uc3RydWN0b3IodmFsdWVzPzogSXRlcmFibGU8Sz4pIHsKICAgIHN1cGVyKHZhbHVlcykKICAgIHRoaXMuX21hcCA/Pz0gbmV3IE1hcCgpCiAgfQoKICBhZGQoa2V5OiBLKSB7CiAgICB0aGlzLl9tYXAgPz89IG5ldyBNYXAoKQogICAgdGhpcy5fbWFwLnNldChrZXksICh0aGlzLl9tYXAuZ2V0KGtleSkgPz8gMCkgKyAxKQogICAgcmV0dXJuIHN1cGVyLmFkZChrZXkpCiAgfQp9Cgpjb25zb2xlLmxvZyhuZXcgQ291bnRhYmxlU2V0KFsiZm9vIl0pKQ)
