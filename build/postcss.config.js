module.exports = {
  ident: 'postcss',
  sourceMap: true,
  plugins: (loader) => [
    require('postcss-import')(),
    require('postcss-preset-env')({
      stage: 0,
      browsers: [
        'last 2 versions',
        'Safari >= 7',
        'Explorer >= 9',
        'iOS >= 9',
        'Android >= 4'
      ]
    }),
    require('cssnano')({
      reduceIdents: false,
      safe: true
    })
  ]
};
