import React, { Component } from 'react'
import { List, Avatar, Button, Badge } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('workIMStore')
@observer
export default class ChatterList extends Component {
  constructor (props, context) {
    super(props)
  }

  handleOnClickChatter (item) {
    const { workIMStore } = this.props
    workIMStore.setCurrentChatter(item.id)
    workIMStore.setDeliverMoney('')
    workIMStore.setDeliverRadioMoney(100)
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const { workIMStore } = this.props
    // List组件有BUG 必须console.log(workIMStore.currentChatter)才能触发workIMStore.currentChatter class更新
    console.log('currentChatter', workIMStore.currentChatter)
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={workIMStore.chartterList}
          renderItem={item => (
            <List.Item
              style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
              className={ item.id === workIMStore.currentChatter ? 'chatters-active chatters' : 'chatters' }
              onClick={() => this.handleOnClickChatter(item)}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={42} src={imgUrl} />}
                title={<div>
                  <span style={{ fontSize: '14px' }}>{item.charName}</span>
                  <span style={{ float: 'right' }}><Badge count={item.unReadNum}></Badge></span>
                </div>}
                description={<span style={{ color: '#aaa', fontSize: '12px' }}>{item.serverName}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
