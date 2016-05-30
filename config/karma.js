var webpack = require('./webpack')

module.exports = function (config) {

  return config.set({
    basePath: '../',

    browsers: [ 'PhantomJS' ],

    frameworks: [ 'mocha', 'chai' ],

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    reporters: config.coverage ? [ 'mocha', 'coverage' ] : [ 'mocha' ],


    coverageReporter: {
      reporters: [
        { type : 'lcov', subdir: './' },
        { type : 'text-summary' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',
      resolve : webpack.resolve,
      plugins : webpack.plugins,

      module  : {
        loaders : webpack.module.loaders.concat(config.coverage ? [{
          test    : /\.js*$/,
          include : [ './src' ],
          loader  : 'isparta?embedSource=true'
        }] : [])
      }
    },

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    }
  })
}
