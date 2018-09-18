import React, { Component } from 'react'
import { Avatar } from 'antd'
import s from './index.css'
import { messageList } from '@/mock/imData'
import moment from 'moment'

export default class MessageList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const leftText = (item) => (<div className={s.leftText}>
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className={s.leftTextItem}>
        <p>{item.text}</p>
        <p className={s.timestamp}>{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={s.leftArrow}></span>
      </div>
    </div>)
    const rightText = (item) => (<div className={s.rightText}>
      <div className={s.rightTextItem}>
        <p>{item.text}</p>
        <p className={s.timestamp}>{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={s.rightArrow}></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)
    const getMessageItem = (item) => {
      // senderId是对方 receiverId是当前用户 所以消息排列在左边
      switch (item.type) {
        case 1:
          return item.senderId === item.threadId ? leftText(item) : rightText(item)
        case 2:
          return ''
        case 3:
          return ''
        case 4:
          return ''
        case 99:
          return ''
        default:
          return ''
      }
    }
    return (
      <ul style={{ padding: '15px 20px' }}>
        {messageList.map((item) => {
          return <li key={item.id}>
            {getMessageItem(item)}
          </li>
        })}
      </ul>
    )
  }
}
