const path = require('path');
const webpack = require('webpack');

const config = {
  entry: [
    './app/index.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};

module.exports = config;
