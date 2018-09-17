import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Link, withRouter } from 'react-router-dom'
import s from './index.css'
import GlobalHeader from './GlobalHeader'
import WorkIM from '@src/view/workIM'
import Bill from '@src/view/bill'

class App extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      current: ''
    }
  }

  render () {
    const { Header, Content, Footer, Sider } = Layout
    // img src 图片都用require, npm build才能正确打包图片
    const imgUrl = require('@src/assets/logo.svg')
    // withRouter(App)以后 this.props就有location等路由相关信息了
    // 每次刷新 切换导航 重新输入url等都会进入这里 重新算出current给到selectedKeys
    // this.props.history.push(a) 动态跳转
    const current = this.props.location.pathname.replace(/\//, '') || 'workIM'
    console.log(current)
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={(broken) => { console.log(broken) }}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type) }}
        >
          <div className={s.logo}>
            <img src={imgUrl} className={s.logoSvg}></img>
            <h1 className={s.h1}>啊啊啊啊附带</h1>
          </div>
          <Menu theme="dark" mode="inline"
            selectedKeys={[current]}
          >
            <Menu.Item key="workIM">
              <Link to="/workIM" replace>
                <Icon type="desktop"/>
                <span className="nav-text">工作台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="bill">
              <Link to="/bill" replace>
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
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/" component={WorkIM} />
              <Route path="/workIM" component={WorkIM} />
              <Route path="/bill" component={Bill} />
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
