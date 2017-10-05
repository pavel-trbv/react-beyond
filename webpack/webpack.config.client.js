const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

const root = process.cwd();
const src  = path.join(root, 'src');
const build = path.join(root, 'build');

const clientSrc    = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');

const clientInclude = [clientSrc, universalSrc];

const extractSASS = new ExtractTextPlugin(path.join(root, src, 'shared', 'styles', 'main.scss'));

const PROD = process.env.NODE_ENV === 'production';

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'react-redux',
  'redux',
  'react-router-redux'
];

const babelQuery = {
  "presets": [
    "react",
    ["es2015", { "modules": false }],
    "stage-0"
  ],
  "plugins": PROD ? [
    "transform-class-properties",
    "transform-object-rest-spread",
    "system-import-transformer",
  ] : [
    "transform-class-properties",
    "transform-object-rest-spread",
    "system-import-transformer",
    "react-hot-loader/babel"
  ],
  compact: false
};

module.exports = {
  devtool: 'eval',
  context: root,
  entry: {
    app: PROD ? [
      //Production
      'babel-polyfill/dist/polyfill.js',
      './src/client/client.js'
    ] : [
      //Development
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './src/client/client.js'
    ],
    vendor
  },
  output: {
    filename: 'app.js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  plugins: PROD ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),    
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences     : true,
        booleans      : true,
        loops         : true,
        unused      : true,
        warnings    : false,
        drop_console: true,
        unsafe      : true
      }
    }),
    new AssetsPlugin({path: build, filename: 'assets.json'}),
    new webpack.DefinePlugin({
      __API__: JSON.stringify('http://localhost:3000')
    }),
    new ExtractTextPlugin('bundle.css')
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      '__CLIENT__': true,
      '__PRODUCTION__': false,
      'process.env.NODE_ENV': JSON.stringify('development'),
      __API__: JSON.stringify('http://localhost:3001')
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./src/shared'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        query: babelQuery,
        //include: clientInclude
      },
      {
        test: /\.css$/,
        loader: PROD ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }) : 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: PROD ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) : 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};