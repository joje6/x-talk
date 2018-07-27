const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
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
  entry: {
    app: path.resolve(src, 'listen.js')
  },
  output: {
    path: path.join(dist, 'js'),
    publicPath: '/js',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  performance: {
    hints: 'warning'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: false,
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            unused: true
          },
          mangle: true,
          beautify: false,
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30 * 1024,
      maxSize: 100 * 1024,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
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
      { from: path.join(asset, 'images'), to: path.join(dist, 'images') },
      { from: path.join(asset, 'favicon.png'), to: dist }
    ])
  ]
});
