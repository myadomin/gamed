// babel转换es6方法
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/view/app'
import '@/style/base.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from '@/store/store'
// 打开 mockjs拦截请求，返回mock数据
// 关闭 请求服务器数据
import mock from '@/mock'
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
