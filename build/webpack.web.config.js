const path = require('path');
const fs = require('fs-extra');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const base = require('./webpack.base.config.js');

const src = path.resolve(__dirname, '../src');
const asset = path.join(__dirname, '../asset');
const dist = path.join(__dirname, '../docs');

// empty output dir
fs.emptyDirSync(dist);

module.exports = merge.strategy({
  entry: 'replace',
  output: 'replace'
})(base, {
  mode: 'production',
  entry: {
    vendor: ['vue', 'x-router'],
    app: path.resolve(src, 'listen.js')
  },
  output: {
    path: path.join(dist, 'js'),
    publicPath: '/js/',
    filename: '[name].js',
    chunkFilename: '[name].js'
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
            warnings: true,
            unused: true
          },
          mangle: true,
          beautify: false,
        },
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 2,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: path.join(dist, 'index.html'),
      template: path.join(asset, 'index.html')
    }),
    new CopyWebpackPlugin([
      { from: path.join(asset, 'favicon.png'), to: dist }
    ])
  ]
});
