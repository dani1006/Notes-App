const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: ["index.html", "src/**/*"],
    compress: true,
    port: 8080,
    open: true,
  },
  devtool: "inline-source-map",
});
