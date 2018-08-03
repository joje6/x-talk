const path = require('path');
const fs = require('fs-extra');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    library: 'XTalk',
    libraryTarget: 'umd'
  },
  performance: {
    hints: 'warning'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            unused: true
          },
          mangle: true,
          beautify: false,
        },
        parallel: true,
        sourceMap: false
      })
    ]
  }
});
