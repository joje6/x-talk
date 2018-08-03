const browsers = [
  'last 2 versions',
  'Safari >= 7',
  'Explorer >= 9',
  'iOS >= 9',
  'Android >= 4'
];

module.exports = {
  ident: 'postcss',
  sourceMap: true,
  plugins: () => [
    require('postcss-import')(),
    require('autoprefixer')({ browsers }),
    require('postcss-preset-env')({
      stage: 0,
      browsers
    }),
    require('cssnano')({
      reduceIdents: false,
      safe: true
    })
  ]
};
