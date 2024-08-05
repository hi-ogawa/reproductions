// both `require` and `module` are undefined
require("node:fs");
module.exports.sum = (x, y) => x + y;
