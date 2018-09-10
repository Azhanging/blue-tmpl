const path = require('path');

module.exports = {

  //file start path
  context: path.resolve(__dirname, '../'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: './dist'
  },

  //alias path
  resolve: {
    extensions: ['.js'],
    alias: {
      '@util': path.resolve(__dirname, '../src/util')
    }
  },

  // devDependencies require no in entry
  externals: {
    fs: {
      commonjs: "fs",
      commonjs2: "fs"
    }
  },

  // use loader
  module: {
    rules: [{
      test: /\.html$/,
      use: [
        'html-loader'
      ]
    }, {
      test: /\.js$/,
      use: [
        'babel-loader'
      ]
    }]
  },

  // map file
  devtool: '#source-map'
};