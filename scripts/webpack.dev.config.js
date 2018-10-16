const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

function resolve (relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    new webpack.DefinePlugin({
      // react源码入口会判断process.env.NODE_ENV是development还是production做优化处理
      // 所以DefinePlugin 定义 process.env.NODE_ENV 让react源码及业务组件可以读取到process.env.NODE_ENV
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true
    }),
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      mapConfig: 'http://41.196.99.30/tgram-pgisbase/config/qdkjdsj_map_config.js'
    }),
    // 控制台打印
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // 传参数的方式
        // 1 package.json script cross-env PROXY_ENV=dev NODE_ENV=dev 方式传参(需要安装cross-en库)
        // 传入的参数在这里都可以通过process.env.xx获取(如下面的messages打印) 用于做一些环境判断等
        // 2 或者在电脑里定义环境变量XXX 那process.env.XXX的值就是定义的环境变量XXX
        // 3 module.exports = merge(webpackConfigBase, webpackConfigDev) 改为下面exports函数
        // module.exports = (options = {}) => merge(webpackConfigBase, webpackConfigDev)
        // 在package.json script 设定webpack-dev-server --env.dev(必须是--env.xxxx的格式)
        // 通过参数options可以得到options.dev=true
        // 4 上面的 webpack.DefinePlugin 定义的 IS_DEVELOPMETN 在这里拿不到
        // DefinePlugin 定义的东西只能在业务组件里面拿 相当于在main.js等业务组件里定义了一个IS_DEVELOPMETN全局变量
        messages: [`PROXY_ENV: ${process.env.PROXY_ENV} -- NODE_ENV: ${process.env.NODE_ENV}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
      }
    })
    // 编译完成动态通知是否有error
    // new WebpackNotifierPlugin({
    //   title: 'Notify',
    //   excludeWarnings: true,
    //   skipFirstNotification: true
    // })
  ],
  // dev环境用eval-source-map prod环境用source-map
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 8208,
    // 自动打开网页
    open: true,
    // necessary for FriendlyErrorsPlugin
    quiet: true,
    proxy: {
      // '/api/index.php/*': {
      //     target: 'http://beeossdev.egtest.cn:7777',
      //     changeOrigin: true
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      // }
    }
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
