module.exports = {
  outputDir: require("path").resolve("..", "server", "public"),
  devServer: {
    proxy: {
      "/api" : {
        target: "http://localhost:5000"
      }
    }
  }
}