var Webpack  = require('webpack')
var path     = require('path')
var pkg      = require('../package')
var __DEV__  = (process.env.NODE_ENV === 'development')

module.exports = {

  devtool: __DEV__ ? 'inline-source-map' : 'source-map',

  entry: [ './src/index.js' ],

  output: {
    path: 'build',
    filename: 'dice-parser.js',
    library: 'diceparser',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  node: {
    Buffer  : false,
    process : false
  },

  resolve: {
    modulesDirectories: [ 'node_modules', '.', 'src' ],
    extensions: [ '', '.js', '.js' ]
  },

  module: {
    loaders: [
      {
        test    : /\.js$/,
        loader  : 'babel',
        exclude : /node_modules/
      }
    ]
  },

  devServer: {
    noInfo: true,
    publicPath: '/'
  }

}
