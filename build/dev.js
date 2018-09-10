const config = require('./config');

const baseConfig = require('./base');

const merge = require('webpack-merge');

module.exports = merge(baseConfig, config.dev);