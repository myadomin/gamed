import React, { Component } from 'react'
import { Avatar } from 'antd'
import './index.styl'
import dayjs from 'dayjs'
import { inject, observer } from 'mobx-react'

@inject('workIMStore')
@observer
export default class MessageList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const { workIMStore } = this.props
    // 普通文本消息
    const textMsg = (item, isLeftText) => (<div className={isLeftText ? 'leftAlign' : 'rightAlign'}>
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className={isLeftText ? 'leftTextItem' : 'rightTextItem'}>
        <p>{item.textMsg}</p>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={isLeftText ? 'leftTextArrow' : 'rightTextArrow'}></span>
      </div>
    </div>)

    // 运营发货给玩家
    const deliverMsg = (item) => (<div className="rightAlign">
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className="rightDeliverReceiptItem">
        <ul>
          <li>运营：{workIMStore.users[item.senderId].charName}</li>
          <li>给玩家：{workIMStore.users[item.receiverId].charName}</li>
          <li>发货：{item.deliverMsg.count / 1000}元</li>
        </ul>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="rightDeliverReceiptArrow"></span>
      </div>
    </div>)

    // 玩家发回收给运营
    const receiptMsg = (item) => (<div className="leftAlign">
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className="leftDeliverReceiptItem">
        <ul>
          <li>玩家：{workIMStore.users[item.senderId].charName}</li>
          <li>向运营：{workIMStore.users[item.receiverId].charName}</li>
          <li>请求回收：{item.receiptMsg.count / 1000}元</li>
          <li>{item.receiptMsg.alipay && '支付宝帐号：' + item.receiptMsg.alipay.account}</li>
          <li>{item.receiptMsg.alipay && item.receiptMsg.alipay.user && '支付宝名称：' + item.receiptMsg.alipay.user}</li>
          <li>{item.receiptMsg.wechat && '微信帐号：' + item.receiptMsg.wechat}</li>
        </ul>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="leftDeliverReceiptArrow"></span>
      </div>
    </div>)

    // 管理员补货给运营
    const SuppleMsg = (item, isLeftSupple) => (<div className={isLeftSupple ? 'leftAlign' : 'rightAlign'}>
      <Avatar shape="square" size={32} src={imgUrl} />
      <div className={isLeftSupple ? 'leftSuppleItem' : 'rightSuppleItem'}>
        <ul>
          <li>管理员：{workIMStore.users[item.senderId].charName}</li>
          <li>给运营：{workIMStore.users[item.receiverId].charName}</li>
          <li>补货：{item.suppleMsg.count / 1000}元</li>
        </ul>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={isLeftSupple ? 'leftSuppleArrow' : 'rightSuppleArrow'}></span>
      </div>
    </div>)

    const getMessageItem = (item) => {
      switch (item.type) {
        case 1:
          // 文本消息 如果item.senderId === item.threadId 说明senderId是对方 receiverId是当前用户 所以文本消息排列在左边
          const isLeftText = item.senderId === item.threadId
          return textMsg(item, isLeftText)
        case 2:
          // 发货消息 运营发钱对应的元宝给玩家 senderId一定是当前用户(运营) receiverId一定是对方(玩家) 排列在右边
          return deliverMsg(item)
        case 3:
          // 回收消息 玩家发钱对应的元宝给运营回收 senderId一定是对方(玩家) receiverId一定是当前用户(运营) 排列在左边
          return receiptMsg(item)
        case 4:
          // senderId一定是管理员 如果item.senderId === item.threadId 消息排列在左边
          const isLeftSupple = item.senderId === item.threadId
          return SuppleMsg(item, isLeftSupple)
        case 99:
          return ''
        default:
          return ''
      }
    }

    return (
      <ul style={{ padding: '15px 20px' }}>
        {workIMStore.users && workIMStore.currentMessages.map((item) => {
          return <li key={item.id}>
            {getMessageItem(item)}
          </li>
        })}
      </ul>
    )
  }
}
