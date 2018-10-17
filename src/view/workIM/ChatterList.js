import React, { Component } from 'react'
import { List, Avatar, Button } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('workIMStore')
@observer
export default class ChatterList extends Component {
  constructor (props, context) {
    super(props)
  }

  handleOnClickChatter (id) {
    const { workIMStore } = this.props
    workIMStore.setCurrentChatter(id)
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const { workIMStore } = this.props
    // List组件有BUG 必须console.log(workIMStore.currentChatter)才能触发workIMStore.currentChatter class更新
    console.log(1111, workIMStore.currentChatter)
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={workIMStore.chartterList}
          renderItem={item => (
            <List.Item
              style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
              className={ item.id === workIMStore.currentChatter ? 'chatters-active chatters' : 'chatters' }
              onClick={() => this.handleOnClickChatter(item.id)}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={42} src={imgUrl} />}
                title={<span style={{ fontSize: '14px' }}>{item.charName}</span>}
                description={<span style={{ color: '#aaa', fontSize: '12px' }}>游戏服王霸天下</span>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
