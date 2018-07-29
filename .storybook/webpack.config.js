const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseconfig = require('../build/webpack.base.config.js');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.module = baseconfig.module;
  storybookBaseConfig.resolve.alias['@'] = path.resolve(__dirname, '..');
  storybookBaseConfig.plugins.push(...[
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]);

  return storybookBaseConfig;
};
