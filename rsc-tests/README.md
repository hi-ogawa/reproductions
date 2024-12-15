Testing example packages, which is likely to an issue with Vite's dep optimization.

|          | cjs | cjs2 | context | context2 |
|----------|:---:|:----:|:-------:|:--------:|
| next     | ✅  |  ✅   |   ✅    |    ✅     |
| next-vite | ❌  |  ✅   |   ❌    |    ✅     |
| waku     | ❌  |  ❌   |   ❌    |    ❌     |
| jacob    |     |      |         |          |
| lazarv   |     |      |         |          |

## reference

- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server/examples/basic/deps
