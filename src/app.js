import React, { Component } from 'react'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import { initWebsocket } from '@/websocket/index'
import WorkSpace from '@/view/workSpace'
import Login from '@/view/login'
import { inject, observer } from 'mobx-react'

@inject('workIMStore')
@observer
class App extends Component {
  constructor (props, context) {
    super(props)
    // 初始化websocket
    initWebsocket(this.props.workIMStore)
  }

  render () {
    return (
      <HashRouter>
        <Switch>
          {/* 如果没有用Switch 那在输入/login的时候 /也匹配了 那就同时加载了Login和WorkSpace组件
          用了Switch 输入/login就只匹配/login 不会再匹配/了 注意/路由要写最后面 */}
          <Route path="/login" component={Login} />
          <Route path="/" component={WorkSpace} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App
