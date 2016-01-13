var path = require('path');
var config = require('./webpack.config');
var mainPath = path.resolve(__dirname, 'js', 'app.js');

config.devtool = 'source-map';
config.entry =  mainPath;

module.exports = config;
