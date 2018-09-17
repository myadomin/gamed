const path = require('path')
const webpack = require('webpack')

function resolve (relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    // vendor
    vendor: ['react', 'react-dom', 'redux', 'react-redux'],
    // 入口文件
    main: resolve('../src/main.js')
  },
  output: {
    path: resolve('../dist'),
    // webpack-dev-server不能用chunkhash 可以用hash 所以这里做个判断
    filename: process.env.NODE_ENV === 'dev' ? '[name].[hash].js' : '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('../src')],
        // 一定要加这个 否则检测不到
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            // 不符合Eslint规则时只console warning(默认false 直接error)
            // emitWarning: true
          }
        }]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // node_modules不启用css module(因为antd不能用css module), 其他都启用css module
      {
        test: /\.css$/,
        include: [resolve('../node_modules')],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: [resolve('../node_modules')],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // css modules支持
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[hash:8].[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // https://www.jb51.net/article/131865.htm
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    // 如果不配置下面 只有main.js和vendor.js 每次修改代码后打包 这两个js的chunkhash值都变化了 不利于vendor.js的缓存
    // 配置了下面 每次修改代码后打包 只变化main mainfest的chunkhash, vendor chunkhash不变化 可以缓存vendor
    // filename和chunkFilename必须使用chunkhash才能让以上规则生效
    // 开发环境webpack-dev-server必须用的hash不能用chunkhash 所以生产环境以上规则不生效
    new webpack.optimize.CommonsChunkPlugin({
      // vendor包括的是一些不常变化的库
      // manifest再抽出此次打包过程中vendor这些库变化的部分(一般都很小)
      // 所以mainfest.js很小每次chunkhash变化了请求也无所谓
      // vendor.js很大 但是chunkhash不变化 一直缓存着 从而提高加载速度
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}

module.exports = webpackConfigBase
