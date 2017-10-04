const webpack = require('webpack');
const path = require('path');

const root = process.cwd();
const src = path.join(root, 'src');

process.noDeprecation = true;

const serverConfig = {
  context: root,
  entry: './src/server/server.js',
  target: 'node',
  output: {
    filename: 'server.js',
    path: root,
    libraryTarget: 'commonjs2'
  },
  stats: {
    warnings: false
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./src/shared'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  }
};

module.exports = serverConfig;