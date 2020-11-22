const path = require("path")
module.exports = {
  resolve: {
      // 别名的配置
      alias: {
          "@": path.join(__dirname, "../src"),
          "view": path.join(__dirname, "../src/view"),
          "controller": path.join(__dirname, "../src/controller"),
          "lib": path.join(__dirname, "../src/lib"),
          "router": path.join(__dirname, "../src/router")
      },
  },
}
