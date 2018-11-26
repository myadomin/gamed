import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import './index.styl'
import MyHeader from '@/view/workSpace/MyHeader'
import MyFooter from '@/view/workSpace/MyFooter'
import WorkIM from '@/view/workIM'
import Bill from '@/view/bill'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { getStorageItem } from '@/utils'

@inject('workIMStore')
@observer
class App extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      current: ''
    }
  }

  render () {
    console.log('work')
    if (!getStorageItem('dToken')) {
      // 动态跳转 this.props.history.push(a)  用replace开发环境没有warning 如果在render里官方推荐Redirect
      return <Redirect replace to="/login" />
    }
    const { Content, Sider } = Layout
    // img src 图片都用require, npm build才能正确打包图片
    const imgUrl = require('@/assets/logo.svg')
    // withRouter(App)以后 this.props就有location等路由相关信息了 好像不需要withRouter也可以？
    const { match, location } = this.props
    const reg = new RegExp(match.path)
    const current = location.pathname.replace(reg, '').replace(/\//, '') || 'workIM'
    console.log(current, match.path)
    return (
      <Layout style={{ height: '100vh' }}>
        <DevTools />
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={(broken) => { console.log(broken) }}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type) }}
        >
          <div className="layout-logo">
            <img src={imgUrl} className="layout-logoSvg"></img>
            <h1 className="layout-h1">啊啊啊啊附带</h1>
          </div>
          <Menu theme="dark" mode="inline"
            selectedKeys={[current]}
          >
            <Menu.Item key="workIM">
              <Link to={match.path + 'workIM'} replace>
                <Icon type="desktop"/>
                <span className="nav-text">工作台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="bill">
              <Link to={match.path + 'bill'} replace>
                <Icon type="file" />
                <span className="nav-text">账单</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <MyHeader />
          <Content style={{ margin: (current === 'workIM' ? '0' : '24px 16px 0') }}>
            <div style={{ padding: (current === 'workIM' ? 0 : 24), background: '#fff' }}>
              <Switch>
                {/* 如果没有用Switch 那在输入/bill的时候 /也匹配了 那就同时加载了Bill和WorkIM组件
                用了Switch 输入/bill就只匹配/Bill 不会再匹配/了 注意/路由要写最后面 */}
                <Route path= {match.path + 'workIM'} component={WorkIM} />
                <Route path= {match.path + 'bill'} component={Bill} />
                <Route path= {match.path} component={WorkIM} />
              </Switch>
            </div>
          </Content>
          <MyFooter />
        </Layout>
      </Layout>
    )
  }
}

export default App
