// Karma configuration
// Generated on Thu Jul 26 2018 06:25:38 GMT+0900 (KST)

const webpackconfig = require('../build/webpack.dev.config.js');

module.exports = function(config) {
  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],
    files: [
      'specs/x-button.spec.js',
      'specs/x-media.spec.js',
      'specs/x-titlebar.spec.js',
      'specs/x-signin.spec.js',
      'specs/x-message-input.spec.js',
      'specs/x-message-list.spec.js'
    ],
    preprocessors: {
      'specs/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackconfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress', 'html'],
    htmlReporter: {
      outputDir: '.test',
      templatePath: null,
      focusOnFailures: true,
      namedFiles: false,
      pageTitle: '테스트 - 컴포넌트',
      urlFriendlyName: false,
      reportName: 'components',
      preserveDescribeNesting: false,
      foldAll: false,
    },
    client: {
      captureConsole: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    browserConsoleLogOptions: {
      terminal: true
    }
  });
};
