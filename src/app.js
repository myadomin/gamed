import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
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
        <div>
          <Route path="/login" component={Login} />
          <Route path="/workSpace" component={WorkSpace} />
        </div>
      </HashRouter>
    )
  }
}

export default App
