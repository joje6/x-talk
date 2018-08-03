const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config.js');

const src = path.resolve(__dirname, '../src');
const dist = path.resolve(__dirname, '../dist/dev');

module.exports = merge(base, {
  entry: {
    app: path.resolve(src, 'listen.js')
  },
  output: {
    path: dist,
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: [
      dist,
      path.resolve(__dirname, '../asset')
    ],
    historyApiFallback: true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: path.resolve(dist, 'index.html'),
      template: path.resolve(__dirname, '../asset/index.html'),
      showErrors: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
