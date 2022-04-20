const path = require('path');

module.exports = {
  // The entry point file described above
  entry: {
    firebase: path.join(__dirname, 'src', 'js', 'firebase.js'),
    help: path.join(__dirname, 'src', 'js', 'helper.js'),
    app: path.join(__dirname, 'src', 'js', 'index.js'),
    cc: path.join(__dirname, 'src', 'js', 'cc.js'),
    il: path.join(__dirname, 'src', 'js', 'instantloan.js'),
    sa: path.join(__dirname, 'src', 'js', 'savingsaccount.js'),
    da: path.join(__dirname, 'src', 'js', 'demat.js'),
    cr: path.join(__dirname, 'src', 'js', 'crypto.js'),
    sc: path.join(__dirname, 'src', 'js', 'simplyclick.js'),
    citi: path.join(__dirname, 'src', 'js', 'citicards.js'),
    bnpl: path.join(__dirname, 'src', 'js', 'bnpl.js')


  },
  // The location of the build folder described above
  output: {
    // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: '[name].bundle.js',
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  watch: true
};