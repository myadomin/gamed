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
      currentId: null,
      chartterList: []
    }
    this.handleOnClickChatter = this.handleOnClickChatter.bind(this)
  }

  handleOnClickChatter (id) {
    this.setState({ currentId: id })
  }

  componentDidMount () {
    sendWs('getMessagesAndUsers', null, (data) => {
      console.log(data)
    })
    recevieWs('setIntervalData', (data) => {
      console.log(data)
    })
  }

  getChartterList () {
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const chartterList = this.props.workIMStore.chartterList
    const { currentId } = this.state
    return (
      <div>1</div>
      // <List
      //   itemLayout="horizontal"
      //   dataSource={chartterList}
      //   renderItem={item => (
      //     <List.Item
      //       style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
      //       className={ item.id === currentId ? 'chatters-active chatters' : 'chatters' }
      //       onClick={() => this.handleOnClickChatter(item.id)}>
      //       <List.Item.Meta
      //         avatar={<Avatar shape="square" size={42} src={imgUrl} />}
      //         title={<span style={{ fontSize: '14px' }}>{item.charName}</span>}
      //         description={<span style={{ color: '#aaa', fontSize: '12px' }}>游戏服王霸天下</span>}
      //       />
      //     </List.Item>
      //   )}
      // />
    )
  }
}
