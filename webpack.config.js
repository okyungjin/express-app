const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: ["./src/index.js", 'webpack-hot-middleware/client'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js", // bundle 될 파일 이름
    publicPath: "http://localhost:3000/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/, //.js 파일 templating
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(styl|css)$/,
        use: [MiniCssExtractPlugin.loader,"css-loader", "stylus-loader"],
      },
    ],
  },
  devServer: {
    // static: '/dist',
    // hot: true,
    // devMiddleware: {
    //   index: true,
    //   mimeTypes: { phtml: 'text/html' },
    //   publicPath: '/dist',
    //   serverSideRender: true,
    //   writeToDisk: true,
    // },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "dist/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
  ],
};