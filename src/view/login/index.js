import React, { Component } from 'react'
import { Layout } from 'antd'
import MyFooter from '@/view/workSpace/MyFooter'

export default class Bill extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { Content } = Layout
    return (
      <Layout style={{ height: '100vh' }} id="login">
        <Content>Content</Content>
        <MyFooter />
      </Layout>
    )
  }
}
