const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkg = require('../package.json');

const postcssconfig = require('./postcss.config.js');

module.exports = {
  mode: process.env.NODE_ENV,
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postLoaders: {
            html: 'babel-loader'
          },
          sourceMap: true,
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: postcssconfig
          }
        ]
      }, {
        test: /\.(jpg|png|woff|woff2|gif|eot|ttf|svg)\??.*$/,
        loader: 'url-loader'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    mainFields: ['browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, '..'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(pkg.version)
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
