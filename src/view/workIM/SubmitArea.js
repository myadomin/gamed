import React, { Component } from 'react'
import { Tabs, Button, Input, Row, Col, Form, Icon } from 'antd'

export default class SubmitArea extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tabKey: 'chat'
    }
  }

  inputMessage (message) {
    console.log(message)
  }

  tabChange (tabKey) {
    this.setState({ tabKey })
  }

  render () {
    const count = 54321
    const type = '元宝'
    const { tabKey } = this.state
    const { showDrawer } = this.props
    return (
      <div style={{ padding: '0 10px' }}>
        <div className="submitTabs" style={{ height: '154px' }}>
          <Tabs
            onChange={(tabKey) => this.tabChange(tabKey)}
            tabBarExtraContent={<span title="运营回收表" className="recepitTable" onClick={showDrawer}
            ><Icon type="table" theme="outlined" /></span>}>
            <Tabs.TabPane tab={<span title="聊天" style={{ padding: '5px' }}><Icon type="message" theme="outlined" /></span>} key="chat">
              <Input.TextArea
                style={{
                  boxShadow: 'none',
                  resize: 'none',
                  height: '104px',
                  border: 'none'
                }}
                onChange={(ev) => this.inputMessage(ev.target.value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span title="发货" style={{ padding: '5px' }}><Icon type="gift" theme="outlined" /></span>} key="deliver">
              <Form className="deliverForm">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="玩家名" labelCol={{span: 6}}>
                      <Input placeholder="Basic usage" value="玩家天下第一" disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="所在服" labelCol={{span: 6}}>
                      <Input placeholder="Basic usage" value="游戏服王霸天下" disabled={true} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="发送金额" labelCol={{span: 6}}>
                      <Input placeholder="请输入发送金额" addonAfter={`${count}个${type}`} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div style={{ padding: '7px 0' }}>
          {tabKey === 'chat'
            ? <Button type="primary" style={{ float: 'right' }}>发送</Button>
            : <Button type="primary" style={{ float: 'right' }}>发货</Button>}
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
    )
  }
}
