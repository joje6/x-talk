const plugins = [
  require('postcss-import')(),
  require('postcss-url')({
    url: 'rebase'
  }),
  require('postcss-apply')(),
  require('postcss-preset-env')({
    stage: 1,
    features: {
      'nesting-rules': true,
      'color-mod-function': {
        unresolved: 'warn'
      }
    },
    autoprefixer: {
      grid: true
    },
    browsers: [
      'last 2 versions',
      'Safari >= 7',
      'Explorer >= 9',
      'iOS >= 9',
      'Android >= 5'
    ]
  })
];

process.env.NODE_ENV === 'production' && plugins.push(require('cssnano')({
  reduceIdents: false,
  safe: true
}));

module.exports = {
  ident: 'postcss',
  sourceMap: true,
  plugins: () => plugins
};
