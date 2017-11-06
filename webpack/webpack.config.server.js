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
    extensions: ['.jsx', '.js'],
    modules: [
      path.resolve('./src/shared'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader/locals?sass-loader'
          }
        ]
      }
    ]
  }
};

module.exports = serverConfig;
