
const path = require("path");

module.exports = {
  entry: [
    "./js/server-message.js",
    "./js/filters.js",
    "./js/server.js",
    "./js/utils.js",
    "./js/data.js",
    "./js/scale.js",
    "./js/validation.js",
    "./js/form.js",
    "./js/comments.js",
    "./js/renderPhoto.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
