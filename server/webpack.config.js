const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: "./dist/main.js", // make sure this matches the main root of your code
  output: {
    path: path.join(__dirname, "dist"), // this can be any path and directory you want
    filename: "server.js",
  },
  optimization: {
    minimize: true,
  },
};
