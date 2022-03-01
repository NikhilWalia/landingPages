const path = require('path');

module.exports = {
  // The entry point file described above
  entry: {
    app: path.join(__dirname, 'src', 'index.js'),
    cc: path.join(__dirname, 'src', 'cc', 'cc.js')

  },
  // The location of the build folder described above
  output: {
    // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  watch: true
};