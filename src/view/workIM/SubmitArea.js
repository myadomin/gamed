import React, { Component } from 'react'
import { Tabs, Button, Input, Row, Col, Form, Icon, Rate, Radio } from 'antd'

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
            defaultActiveKey="deliver"
            tabBarExtraContent={<span title="运营回收表" className="recepitTable" onClick={showDrawer}>
              <Icon type="table" theme="outlined" style={{ fontSize: '24px', marginTop: '15px' }} /></span>}>
            <Tabs.TabPane tab={<span title="聊天">
              <Icon type="message" theme="outlined" style={{ fontSize: '24px' }} /></span>} key="chat">
              <Input.TextArea
                style={{
                  boxShadow: 'none',
                  resize: 'none',
                  height: '104px',
                  border: 'none'
                }}
                onChange={(ev) => this.inputMessage(ev.target.value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span title="发货">
              <Icon type="gift" theme="outlined" style={{ fontSize: '24px' }} /></span>} key="deliver">
              <Form className="deliverForm">
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="快选金额" labelCol={{span: 4}}>
                      <Radio.Group value={100}>
                        <Radio value={50}>50</Radio>
                        <Radio value={100}>100</Radio>
                        <Radio value={200}>200</Radio>
                        <Radio value={300}>300</Radio>
                        <Radio value={500}>500</Radio>
                        <Radio value={1000}>1000</Radio>
                        <Radio value={2000}>2000</Radio>
                        <Radio value={5000}>5000</Radio>
                        <Radio value={8000}>8000</Radio>
                      </ Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={16}>
                    <Form.Item label="发送金额" labelCol={{span: 6}}>
                      <Input placeholder="请输入发送金额" addonAfter={`${count}个${type}`} />
                      <div style={{ color: '#888' }}>
                        发送给玩家 <span style={{ color: '#333' }}>天下第一</span>
                        (<span style={{ color: '#333' }}>王霸天下</span>)
                      </div>
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
