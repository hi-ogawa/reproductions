- https://github.com/vitejs/vite/issues/18091

```sh
$ node repro.mjs sass-embedded
Internal compiler error: Stack Overflow
dart:collection-patch/compact_hash.dart                _LinkedHashMapMixin._getValueOrData
package:sass/src/environment.dart                      Environment.getMixin
...

# OOM
$ node repro.mjs sass
```
