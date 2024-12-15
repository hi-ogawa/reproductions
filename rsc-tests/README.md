Testing example packages, which likely casues an issue with Vite's dep optimization.

|            | cjs | cjs2 | context | context2 | context3 |
|------------|:---:|:----:|:-------:|:--------:|:--------:|
| next       |  ✅  |  ✅  |    ✅   |    ✅    |    ✅    |
| next-vite  |  ❌  |  ✅  |    ❌   |    ✅    |    ✅    |
| waku       |  ❓  |  ❓  |    ❓   |    ❓    |    ❓    |
| jacob      |  ❓  |  ❓  |    ❓   |    ❓    |    ❓    |
| lazarv     |  ❓  |  ❓  |    ❓   |    ❓    |    ❓    |

## references

- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server/examples/basic/deps
