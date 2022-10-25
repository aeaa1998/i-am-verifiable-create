const { defineConfig } = require("@vue/cli-service");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin")

const path = require('path')
module.exports = defineConfig(
  {
    publicPath: '/i-am-verifiable-create/',
    // outputDir: 'dist/i-am-verifiable-create/',
    // indexPath: "../index.html",
    chainWebpack(config){    
      config.resolve.symlinks(false)
      config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))  
    },
    transpileDependencies: true,
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      resolve: {
        fallback: {
          "fs": false,
          "tls": false,
          "buffer": require.resolve("buffer"),
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "assert": false,
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
        },
      }
    }
  }
);
