import React, { Component } from 'react'
import { Avatar } from 'antd'
import s from './index.css'
import { messageList, user } from '@/mock/imData'
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

    const deliverMsg = (item) => (<div className={s.rightText}>
      <div className={s.rightDeliverReceiptItem}>
        <ul>
          <li>发货：{user[item.senderId].charName}</li>
          <li>收货：{user[item.receiverId].charName}</li>
          <li>金额：{item.deliverMsg.count / 1000}元</li>
        </ul>
        <p className={s.timestamp}>{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={s.rightDeliverReceiptArrow}></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)

    const receiptMsg = (item) => (<div className={s.leftText}>
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className={s.leftDeliverReceiptItem}>
        <ul>
          <li>请求回收：{user[item.senderId].charName}</li>
          <li>回收者：{user[item.receiverId].charName}</li>
          <li>金额：{item.receiptMsg.count / 1000}元</li>
          <li>支付宝收款：{item.receiptMsg.alipay}</li>
          <li>微信收款：{item.receiptMsg.wechat}</li>
        </ul>
        <p className={s.timestamp}>{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={s.leftDeliverReceiptArrow}></span>
      </div>
    </div>)

    const getMessageItem = (item) => {
      switch (item.type) {
        case 1:
          // 文本消息 item.senderId === item.threadId 说明senderId是对方 receiverId是当前用户 所以文本消息排列在左边
          return item.senderId === item.threadId ? leftText(item) : rightText(item)
        case 2:
          // 发货消息 运营发钱对应的元宝给玩家 senderId一定是当前用户(运营) 接受者一定是对方(玩家) 排列在右边
          return deliverMsg(item)
        case 3:
          // 回收消息 玩家发钱对应的元宝给运营回收 senderId一定是对方(玩家) 接受者一定是当前用户(运营) 排列在左边
          return receiptMsg(item)
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
