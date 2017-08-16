var path = require('path');
var webpack = require('webpack');

var entry = './src/index.js';

var output = {
  path: path.resolve(__dirname, 'lib'),
  filename: 'form-validator.js'
};

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    screw_ie8: true,
    warnings: false
  },
  output: {
    comments: false
  }
});

module.exports = {
  entry: entry,
  output: output,
  module : {
    loaders : [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [ uglifyJsPlugin ]
};
