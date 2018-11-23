// babel转换es6方法
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/app'
import '@/style/base.styl'
import { Provider } from 'mobx-react'
import workIMStore from '@/stores/workIMStore.js'

const stores = {
  workIMStore
}

ReactDOM.render(
  // <Provider workIMStore={workIMStore}>
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
