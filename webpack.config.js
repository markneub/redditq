var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');
var mainPath = path.resolve(__dirname, 'js', 'app.js');

var config = {
  node: {
   __filename: true,
   fs: 'empty'
  },

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath
  ],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
    }, {
      test: /\.hbs$/,
      exclude: /node_modules/,
      loader: "handlebars-loader"
    }]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new Webpack.HotModuleReplacementPlugin() // we have to manually add the Hot Replacement plugin when running from Node
  ],
  externals: {
    'TweenLite': 'TweenLite'
  },
  resolve: {
    alias: {
      "eventEmitter/EventEmitter": "wolfy87-eventemitter"
    }
  }
};

module.exports = config;
