import React, { Component } from 'react'
import { Avatar, Icon, Tooltip } from 'antd'
import './index.styl'
import dayjs from 'dayjs'
import { inject, observer } from 'mobx-react'
import { sendWs } from '@/websocket/index'

@inject('workIMStore')
@observer
export default class MessageList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  // 首次加载这个组件的时候触发
  componentDidMount () {
    this.scrollToBottom()
  }

  // 切换chatter或者添加消息等改变messageList的行为触发这个方法
  componentWillUpdate () {
    this.scrollToBottom()
  }

  // messageList滚动到最底部
  scrollToBottom () {
    // todo 没有vue nextTick
    setTimeout(() => {
      document.getElementById('rightTop').scrollTop = document.getElementById('rightTop').scrollHeight
    }, 1)
  }

  render () {
    const imgUrl = require('@/assets/11.jpg')
    const { workIMStore } = this.props
    // 普通文本消息
    const textMsg = (item, isLeftText) => (
      <div className={isLeftText ? 'leftTextItem' : 'rightTextItem'}>
        <p>{item.textMsg}</p>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={isLeftText ? 'leftTextArrow' : 'rightTextArrow'}></span>
      </div>)

    // 运营发货给玩家
    const deliverMsg = (item) => (
      <div className="rightDeliverReceiptItem">
        <ul>
          <li>运营：{workIMStore.users[item.senderId].charName}</li>
          <li>给玩家：{workIMStore.users[item.receiverId].charName}</li>
          <li>发货：{item.deliverMsg.count / 1000}元</li>
        </ul>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className="rightDeliverReceiptArrow"></span>
      </div>)

    // 玩家发回收给运营
    const receiptMsg = (item) => (
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
      </div>)

    // 管理员补货给运营
    const SuppleMsg = (item, isLeftSupple) => (
      <div className={isLeftSupple ? 'leftSuppleItem' : 'rightSuppleItem'}>
        <ul>
          <li>管理员：{workIMStore.users[item.senderId].charName}</li>
          <li>给运营：{workIMStore.users[item.receiverId].charName}</li>
          <li>补货：{item.suppleMsg.count / 1000}元</li>
        </ul>
        <p className="timestamp">{dayjs(item.timestamp).format('MM-DD: HH:mm:ss')}</p>
        <span className={isLeftSupple ? 'leftSuppleArrow' : 'rightSuppleArrow'}></span>
      </div>)

    // 当前用户只有两种身份 1运营 2管理员
    const getMessageItem = (item, isLeft) => {
      switch (item.type) {
        case 1:
          // 文本消息 无论任何身份 都可以互相发
          return textMsg(item, isLeft)
        case 2:
          // 发货消息 运营发钱对应的元宝给玩家
          // 当前用户只能是运营 运营是发送者(senderId) 排列在右边
          return deliverMsg(item)
        case 3:
          // 回收消息 玩家发钱对应的元宝给运营回收
          // 当前用户只能是运营 运营是接受者(receiverId) 排列在左边
          return receiptMsg(item)
        case 4:
          // 当前用户是运营 运营只能是接收者(receiverId) 排列在左边
          // 当前用户是管理员 管理员只能是发送者(senderId) 排列在右边
          return SuppleMsg(item, isLeft)
        case 99:
          return ''
        default:
          return ''
      }
    }

    const showStatus = (item) => {
      const { status } = item
      if (status === 1) {
        // 发送中
        return <Icon className="loading" type="loading-3-quarters" spin />
      } else if (status === 2) {
        // 成功
        return null
      } else if (status === 3) {
        // 失败 可以重新发
        return <Tooltip placement="top" title={'发送失败, 点击重发消息'}>
          <Icon type="exclamation-circle" theme="outlined" onClick={() => sendMessageAgain(item)} />
        </Tooltip>
      } else if (status === 4) {
        // 余额不足
        return <Tooltip placement="top" title={'余额不足'}>
          <Icon type="minus-circle" theme="outlined" />
        </Tooltip>
      } else if (status === 5) {
        // 玩家不在线
        return <Tooltip placement="top" title={'玩家不在线'}>
          <Icon type="minus-circle" theme="outlined" />
        </Tooltip>
      }
    }

    // 再次发送此条消息
    const sendMessageAgain = (item) => {
      const { workIMStore } = this.props
      const data = { message: Object.assign(item, { status: 1 }) }
      sendWs('sendMessage', data, (data) => {
        workIMStore.updateMessagesAndUsers(data.message.localId, data)
      })
    }

    return (
      <ul style={{ padding: '15px 20px' }}>
        {workIMStore.currentMessages.map(item => {
          const isLeft = item.senderId === item.threadId
          return <li key={item.id}>
            <div className={isLeft ? 'leftAlign' : 'rightAlign'}>
              <Avatar shape="square" size={32} src={imgUrl} />
              {getMessageItem(item, isLeft)}
              <div style={{ margin: '5px' }}>{showStatus(item)}</div>
            </div>
          </li>
        })}
      </ul>
    )
  }
}
