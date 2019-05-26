
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const publicPath = '/';
const src = path.join(__dirname, 'src');

console.log(src);

module.exports = function () {

  return {
    entry: path.join(src, 'app.js'),
    output: {
      filename: '[name].js',
      publicPath
    },
    performance: {
        hints: false
    },
    devServer: {
      open: true,
      port: 8081,
      hot: true,
      publicPath,
      clientLogLevel: 'warning',
      // public: 'http://localhost:9000/ww/index.html'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.png$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './index.html'
      })
    ],
  }

};
