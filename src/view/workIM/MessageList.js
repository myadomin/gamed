import React, { Component } from 'react'
import { Avatar } from 'antd'
import s from './index.css'

export default class MessageList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    const data = [
      {
        id: 1,
        title: '玩家玩家1玩家玩家1玩家1玩家1玩家1玩家1玩家1玩家1玩家11玩家玩家1玩家1玩家1玩家1玩家1玩家1玩家1玩家11玩家玩家1玩家1玩家1玩家1玩家1玩家1玩家1玩家11玩家玩家1玩家1玩家1玩家1玩家1玩家1玩家1玩家11玩家玩家1玩家1玩家1玩家1玩家1玩家1玩家1玩家11玩家1玩家1玩家1玩家1玩家1玩家1玩家11'
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
      }
    ]
    const imgUrl = require('@src/assets/11.jpg')
    const left = (item) => (<div className={s.leftMessage}>
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className={s.leftMessageItem}>
        <span>{item.title}</span>
        <span className={s.leftArrow}></span>
      </div>
    </div>)
    const right = (item) => (<div className={s.rightMessage}>
      <div className={s.rightMessageItem}>
        <span>{item.title}</span>
        <span className={s.rightArrow}></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)
    return (
      <ul style={{ padding: '15px 20px' }}>
        {data.map((item) => {
          return <li key={item.id}>
            {item.id % 2 === 0 ? left(item) : right(item)}
          </li>
        })}
      </ul>
    )
  }
}
