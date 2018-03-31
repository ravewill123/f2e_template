const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/assets/js/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["es2015"]
            }
          }
        ]
      }, {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/assets/sass'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          publicPath: '../'
        })
      }, {
        test: /\.(png|jpg|gif|svg|ico)$/,
        include: path.resolve('src/assets/img'),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              outputPath: "img/",
              context: path.resolve(__dirname, 'src/assets/img'),
              name:  "[path][name].[ext]?[hash:5]" // fallback to file-loader.
            }
          }
        ]
      }, {
        test: /\.(otf|ttf|eot|woff|woff2|svg)$/,
        include: path.resolve('src/assets/fonts'),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              publicPath: "../",
              name: "fonts/[name].[ext]" // fallback to file-loader.
            }
          }
        ]
      }, {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('css/style.css'),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'src/assets'),
        from: 'img/moved',
        to: 'img'
      },
    ])
  ]
};
