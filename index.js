process.env.TZ = "Asia/Shanghai"
const path = require("path");
require(path.resolve(__dirname, "data/pollyfill/index.js"));
require("./src/index.js")
