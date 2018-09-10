const path = require('path');

const webpack = require('webpack');

const library = require('./library');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


//development

/*
if ( module.hot ) {
  module.hot.accept()
}
* */

const dev = {

  entry: {
    app: './src/main',
  },

  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: 'js/[name].js',
    publicPath: './'
  },

  //dev sever
  devServer: {
    host: 'localhost',
    inline: true,
    hot: true,
    progress: false,
    compress: false,
    port: 5000,

    //server root path
    contentBase: path.join(__dirname, '../'),

    //server static root path publicPath + output.publicPath + filename
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': "'development'",
      'process.build': "false"
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `index.html`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
};

//production
const prod = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 500
  },
  entry: {
    [`${library.name}`]: './src/core',
    [`${library.name}.min`]: './src/core'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static/'),
    filename: 'js/[name].js',
    publicPath: './static',
    library: "BlueTmpl",
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  plugins: [

    new webpack.BannerPlugin(`
${library.name}.js ${library.version}
(c) 2016-2017 Blue
Released under the MIT License.
https://github.com/azhanging/${library.name}
time:${new Date().toUTCString()}
		`),

    new webpack.DefinePlugin({
      'process.env': "'production'"
    }),

    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      include: /\.min\.js$/,
      sourceMap: true,
      parallel: true
    })
  ],
};

//config
const config = {
  dev,
  prod
};

module.exports = config;