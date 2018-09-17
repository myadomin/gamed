
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rimraf = require('rimraf')

function resolve (relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false
    }),
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      mapConfig: 'http://56.32.3.21/config/qdkjdsj_map_config.js'
    }),
    /* 压缩优化代码开始 */
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 3011 })
  ],
  devtool: 'source-map'
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
