const webpack = require('webpack');

const config = require('./config');

const baseConfig = require('./base');

const merge = require('webpack-merge');

webpack(merge(baseConfig, config.prod), (err, stats) => {

  //webpack config err
  if ( err ) {
    throw err;
  }

  //webpack run err
  const info = stats.toJson();
  if ( stats.hasErrors() ) {
    console.error(info.errors.join('\n'));
  }
  if ( stats.hasWarnings() ) {
    console.warn(info.warnings.join('\n'));
  }

});