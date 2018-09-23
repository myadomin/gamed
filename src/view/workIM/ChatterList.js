import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { messageList, user } from '@/mock/imData'

export default class ChatterList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      currentId: null,
      chartterList: []
    }
    this.handleOnClickChatter = this.handleOnClickChatter.bind(this)
    this.getChartterList = this.getChartterList.bind(this)
  }

  handleOnClickChatter (id) {
    this.setState({ currentId: id })
  }

  componentDidMount () {
    this.getChartterList(messageList)
  }

  getChartterList (messageList) {
    let chartterList = []
    messageList.forEach(obj => {
      if (chartterList.indexOf(obj.threadId) === -1) {
        chartterList.push(obj.threadId)
      }
    })
    this.setState({ currentId: chartterList[0] })
    this.state.chartterList = chartterList.map(item => user[item])
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const { currentId, chartterList } = this.state
    return (
      <List
        itemLayout="horizontal"
        dataSource={chartterList}
        renderItem={item => (
          <List.Item
            style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
            className={ item.id === currentId ? 'chatters-active chatters' : 'chatters' }
            onClick={() => this.handleOnClickChatter(item.id)}>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={42} src={imgUrl} />}
              title={<span style={{ fontSize: '14px' }}>{item.charName}</span>}
              description={<span style={{ color: '#aaa', fontSize: '12px' }}>游戏服王霸天下</span>}
            />
          </List.Item>
        )}
      />
    )
  }
}
