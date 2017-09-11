/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'client/dist');
const SRC_DIR = path.resolve(__dirname, 'client/src');


module.exports = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  devServer: {
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css/,
        include: SRC_DIR + '/css',
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|bmp|gif|svg)$/,
        loader: 'file-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
