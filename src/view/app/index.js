import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Link, withRouter } from 'react-router-dom'
import './index.styl'
import GlobalHeader from './GlobalHeader'
import WorkIM from '@/view/workIM'
import Bill from '@/view/bill'
import { initWebsocket } from '@/websocket/index'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

@inject('workIMStore')
@observer
class App extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      current: ''
    }
    // 初始化websocket
    initWebsocket(this.props.workIMStore)
  }

  render () {
    const { Header, Content, Footer, Sider } = Layout
    // img src 图片都用require, npm build才能正确打包图片
    const imgUrl = require('@/assets/logo.svg')
    // withRouter(App)以后 this.props就有location等路由相关信息了
    // 每次刷新 切换导航 重新输入url等都会进入这里 重新算出current给到selectedKeys
    // this.props.history.push(a) 动态跳转
    const { match, location } = this.props
    const current = location.pathname.replace(/\/app/, '').replace(/\//, '') || 'workIM'
    console.log(current)
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
              <Link to={`${match.path}/workIM`} replace>
                <Icon type="desktop"/>
                <span className="nav-text">工作台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="bill">
              <Link to={`${match.path}/bill`} replace>
                <Icon type="file" />
                <span className="nav-text">账单</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader />
          </Header>
          <Content style={{ margin: (current === 'workIM' ? '0' : '24px 16px 0') }}>
            <div style={{ padding: (current === 'workIM' ? 0 : 24), background: '#fff' }}>
              <Route exact path={match.path} component={WorkIM} />
              <Route path={`${match.path}/workIM`} component={WorkIM} />
              <Route path={`${match.path}/bill`} component={Bill} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              xxxx ©2018 Created by xxxxx
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(App)
