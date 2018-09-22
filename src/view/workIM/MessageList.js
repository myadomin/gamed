import React, { Component } from 'react'
import { Avatar } from 'antd'
import './index.styl'
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
    // 普通文本消息
    const leftText = (item) => (<div className="leftAlign">
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className="leftTextItem">
        <p>{item.text}</p>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="leftTextArrow"></span>
      </div>
    </div>)
    const rightText = (item) => (<div className="rightAlign">
      <div className="rightTextItem">
        <p>{item.text}</p>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="rightTextArrow"></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)

    // 运营发货给玩家
    const deliverMsg = (item) => (<div className="rightAlign">
      <div className="rightDeliverReceiptItem">
        <ul>
          <li>运营：{user[item.senderId].charName}</li>
          <li>发货：{item.deliverMsg.count / 1000}元</li>
          <li>给玩家：{user[item.receiverId].charName}</li>
        </ul>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="rightDeliverReceiptArrow"></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)

    // 玩家发回收给运营
    const receiptMsg = (item) => (<div className="leftAlign">
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className="leftDeliverReceiptItem">
        <ul>
          <li>玩家：{user[item.senderId].charName}</li>
          <li>请求回收：{item.receiptMsg.count / 1000}元</li>
          <li>支付宝收款：{item.receiptMsg.alipay}</li>
          <li>微信收款：{item.receiptMsg.wechat}</li>
          <li>回收运营：{user[item.receiverId].charName}</li>
        </ul>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="leftDeliverReceiptArrow"></span>
      </div>
    </div>)

    // 管理员补货给运营 运营是当前用户
    const leftSupple = (item) => (<div className="leftAlign">
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className="leftSuppleItem">
        <ul>
          <li>管理员：{user[item.senderId].charName}</li>
          <li>补货：{item.suppleMsg.count / 1000}元</li>
          <li>给运营：{user[item.receiverId].charName}</li>
        </ul>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="leftSuppleArrow"></span>
      </div>
    </div>)
    // 管理员补货给运营 管理员是当前用户
    const rightSupple = (item) => (<div className="rightAlign">
      <div className="rightSuppleItem">
        <ul>
          <li>管理员：{user[item.senderId].charName}</li>
          <li>补货：{item.suppleMsg.count / 1000}元</li>
          <li>给运营：{user[item.receiverId].charName}</li>
        </ul>
        <p className="timestamp">{moment(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="rightSuppleArrow"></span>
      </div>
      <Avatar shape="square" size={32} src={imgUrl} />
    </div>)

    const getMessageItem = (item) => {
      switch (item.type) {
        case 1:
          // 文本消息 如果item.senderId === item.threadId 说明senderId是对方 receiverId是当前用户 所以文本消息排列在左边
          return item.senderId === item.threadId ? leftText(item) : rightText(item)
        case 2:
          // 发货消息 运营发钱对应的元宝给玩家 senderId一定是当前用户(运营) 接受者一定是对方(玩家) 排列在右边
          return deliverMsg(item)
        case 3:
          // 回收消息 玩家发钱对应的元宝给运营回收 senderId一定是对方(玩家) 接受者一定是当前用户(运营) 排列在左边
          return receiptMsg(item)
        case 4:
          return item.senderId === item.threadId ? leftSupple(item) : rightSupple(item)
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
