  //webpack.common.js
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');  
  const HtmlWebpackPlugin = require('html-webpack-plugin');    
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  module.exports = {
    // entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template:'./src/index.html',
        title: '在线制作ppt',
        minify: {
          removeComments: false, // 改为false
          collapseWhitespace: false, // 改为false
          removeAttributeQuotes: false // 改为false
          },
      }),
      // new MiniCssExtractPlugin({
      //   filename: "[name].[contenthash].css",
      //   chunkFilename: "[name].[contenthash].css"
      // })
    ],
    module:{
　　　　rules:[
　　　　　　{
　　　　　　　　test:/\.js$/,
　　　　　　　　use:[
　　　　　　　　　　　　{
　　　　　　　　　　　　　　loader:'babel-loader',
                        options: {
                            "presets": ["@babel/preset-env",],
                            "plugins": [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
　　　　　　　　　　　　},
　　　　　　　　　　],
　　　　　　},
          {
            test: /\.css$/,
            use:[
              // {
              //   loader: MiniCssExtractPlugin.loader
              // },
              {
                loader: 'css-loader'
              },
            ]
          }
　　　　]
　　},
    output: {
      filename: 'index.js',           
      path: path.resolve(__dirname, 'dist')    //定义输出文件夹dist路径
    }
  };