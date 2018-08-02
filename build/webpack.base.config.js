const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkg = require('../package.json');

const postcssconfig = require('./postcss.config.js');

module.exports = {
  mode: process.env.NODE_ENV,
  node: {
    __dirname: true,
    __filename: true,
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              {
                loader: MiniCssExtractPlugin.loader
              }, {
                loader: 'vue-style-loader',
                options: {
                  shadowMode: true
                }
              }, {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]',
                  sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: postcssconfig
              }
            ],
            less: [
              {
                loader: MiniCssExtractPlugin.loader
              }, {
                loader: 'vue-style-loader',
                options: {
                  shadowMode: true
                }
              }, {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]',
                  sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: postcssconfig
              }, {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          postLoaders: {
            html: 'babel-loader'
          },
          sourceMap: true
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true
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
        test: /\.less$/,
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
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              plugins: [
                new CleanCSSPlugin({
                  advanced: true,
                  compatibility: '*'
                })
              ]
            }
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
    extensions: ['.js', '.json', '.vue', '.less'],
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
