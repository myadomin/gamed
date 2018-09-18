import React, { Component } from 'react'
import { List, Avatar } from 'antd'

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

  render () {
    const data = [
      {
        id: 1,
        title: '玩家1'
      },
      {
        id: 2,
        title: '玩家2'
      },
      {
        id: 3,
        title: '玩家3'
      },
      {
        id: 4,
        title: '玩家4'
      },
      {
        id: 5,
        title: '玩家1'
      },
      {
        id: 6,
        title: '玩家2'
      },
      {
        id: 7,
        title: '玩家3'
      },
      {
        id: 8,
        title: '玩家4'
      },
      {
        id: 9,
        title: '玩家1'
      },
      {
        id: 10,
        title: '玩家2'
      },
      {
        id: 11,
        title: '玩家3'
      },
      {
        id: 12,
        title: '玩家4'
      }
    ]
    const imgUrl = require('@/assets/11.jpg')
    const { currentId } = this.state
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            style={{ padding: '12px 20px', cursor: 'default', borderBottom: '1px solid #e0e0e0' }}
            className={ item.id === currentId ? 'chatterList-active chatterList-chatters' : 'chatterList-chatters' }
            onClick={() => this.handleOnClickChatter(item.id)}>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={42} src={imgUrl} />}
              title={<span style={{ fontSize: '14px' }}>{item.title}</span>}
              description={<span style={{ color: '#aaa', fontSize: '12px' }}>游戏服王霸天下</span>}
            />
          </List.Item>
        )}
      />
    )
  }
}
