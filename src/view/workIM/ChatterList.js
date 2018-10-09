import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { messageList, user } from '@/mock/imData'
import { inject, observer } from 'mobx-react'
import { sendWs, recevieWs } from '@/websocket/index'

@inject('workIMStore')
@observer
export default class ChatterList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      currentId: null
    }
    this.handleOnClickChatter = this.handleOnClickChatter.bind(this)
  }

  handleOnClickChatter (id) {
    this.setState({ currentId: id })
  }

  componentDidMount () {
    sendWs('getMessagesAndUsers', null, (data) => {
      const { workIMStore } = this.props
      workIMStore.setMessages(data.messages)
      workIMStore.setUsers(data.users)
      // console.log(this.props.workIMStore.messages, this.props.workIMStore.users)
    })
    // recevieWs('setIntervalData', (data) => {
    //   console.log(data)
    // })
  }

  getChartterList (messages, users) {
    let chartterListIds = []
    messages.forEach(obj => {
      if (chartterListIds.indexOf(obj.threadId) === -1) {
        chartterListIds.push(obj.threadId)
      }
    })
    return chartterListIds.map(item => users[item])
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    console.log(this.props.workIMStore.messages, this.props.workIMStore.users)
    const chartterList = this.getChartterList(this.props.workIMStore.messages, this.props.workIMStore.users)
    // this.setState({ currentId: chartterList[0] })
    const { currentId } = this.state
    // console.log(chartterList[0])
    return (
      <List
        itemLayout="horizontal"
        dataSource={chartterList}
        renderItem={item => (
          <List.Item
            style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
            className={ item && item.id === currentId ? 'chatters-active chatters' : 'chatters' }
            onClick={() => this.handleOnClickChatter(item && item.id)}>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={42} src={imgUrl} />}
              title={<span style={{ fontSize: '14px' }}>{item && item.charName}</span>}
              description={<span style={{ color: '#aaa', fontSize: '12px' }}>游戏服王霸天下</span>}
            />
          </List.Item>
        )}
      />
    )
  }
}
