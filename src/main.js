// babel转换es6方法
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/view/app'
import '@/style/base.styl'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import workIMStore from '@/stores/workIMStore.js'
import { initWebsocket } from '@/websocket/index'

const stores = {
  workIMStore
}

// websocket初始化
// initWebsocket()

ReactDOM.render(
  // <Provider workIMStore={workIMStore}>
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
