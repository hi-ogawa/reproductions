- https://github.com/vitejs/vite/issues/18091

```sh
$ node repro.mjs sass-embedded
Internal compiler error: Stack Overflow
dart:collection-patch/compact_hash.dart                _LinkedHashMapMixin._getValueOrData
package:sass/src/environment.dart                      Environment.getMixin
...

# OOM
$ node repro.mjs sass
<--- Last few GCs --->

[21020:0x111e91d0]    19073 ms: Mark-Compact 4046.0 (4132.5) -> 4043.2 (4132.2) MB, 2144.83 / 0.00 ms  (average mu = 0.166, current mu = 0.042) allocation failure; scavenge might not succeed
[21020:0x111e91d0]    21670 ms: Mark-Compact 4059.2 (4132.2) -> 4056.4 (4159.2) MB, 2587.52 / 0.00 ms  (average mu = 0.080, current mu = 0.004) allocation failure; scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----
...
```
