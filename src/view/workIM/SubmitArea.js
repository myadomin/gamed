import React, { Component } from 'react'
import { Tabs, Button, Input, Row, Col, Form, Icon, Rate, Radio } from 'antd'
import { inject, observer } from 'mobx-react'
import { sendWs } from '@/websocket/index'

@inject('workIMStore')
@observer
export default class SubmitArea extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tabKey: 'chat',
      textMsg: ''
    }
  }

  inputTextMsg (textMsg) {
    this.setState({ textMsg })
  }

  sendMessage () {
    const { workIMStore } = this.props
    const localId = new Date().getTime()
    // 如果是和已在对话列表的人发消息 本地store就有users
    // 如果添加一个人和他对话 下拉这个人选择后 存这个人到store的user里
    // 所以在sendMessage的时候就不需要带上users字段
    const data = {
      message: {
        // 先id设为只一个唯一数用于messageList渲染 之后后台会返回真正的id
        id: localId,
        // localId后台成功返回此条message后 再通过localId修改此条messsage
        localId: localId,
        threadId: workIMStore.currentChatter,
        senderId: workIMStore.currentUser,
        receiverId: workIMStore.currentChatter,
        status: 1,
        type: 1,
        textMsg: this.state.textMsg
      }
    }
    // 发送消息(正在发送) 先存入store在本地显示
    workIMStore.addMessagesAndUsers(data)
    sendWs('sendMessage', data, (data) => {
      // 存入后台后 发送消息(成功) 修改了message的id timestamp status ，通过localId找到store里的这条消息修改它
      workIMStore.updateMessagesAndUsers(data.message.localId, data)
    })
  }

  tabChange (tabKey) {
    this.setState({ tabKey })
  }

  render () {
    const count = 54321
    const type = '元宝'
    const { tabKey, textMsg } = this.state
    const { showDrawer } = this.props
    return (
      <div style={{ padding: '0 10px' }}>
        <div className="submitTabs">
          <Tabs
            onChange={(tabKey) => this.tabChange(tabKey)}
            defaultActiveKey="chat"
            tabBarExtraContent={<span title="运营回收表" className="recepitTable" onClick={showDrawer}>
              <Icon type="table" theme="outlined" style={{ fontSize: '24px', marginTop: '15px' }} /></span>}>
            <Tabs.TabPane tab={<span title="聊天"><Icon type="message" theme="outlined" style={{ fontSize: '24px' }} /></span>} key="chat">
              <Input.TextArea
                style={{
                  boxShadow: 'none',
                  resize: 'none',
                  height: '104px',
                  border: 'none'
                }}
                value={textMsg}
                onChange={(ev) => this.inputTextMsg(ev.target.value)} />
              <div>
                <Button type="primary" style={{ float: 'right' }} onClick={this.sendMessage.bind(this)}>发送</Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span title="发货"><Icon type="gift" theme="outlined" style={{ fontSize: '24px' }} /></span>} key="deliver">
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
                        发送给玩家 <span>天下第一</span>
                        (<span>王霸天下</span>)
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div>
                <Button type="primary" style={{ float: 'right' }}>发货</Button>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
