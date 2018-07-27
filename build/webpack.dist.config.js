const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

const src = path.resolve(__dirname, '../src');
const target = path.resolve(__dirname, '../dist');

// empty output dir
fs.emptyDirSync(target);

module.exports = merge.strategy({
  output: 'replace'
})(base, {
  entry: {
    app: src
  },
  output: {
    path: target,
    filename: '[name].js',
    library: 'VueChat',
    libraryTarget: 'umd'
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true
      },
      mangle: true,
      beautify: false,
      parallel: true,
      sourceMap: false
    })
  ]
});
