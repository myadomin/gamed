module.exports = [
  {
    id: 122,
    localId: '某个唯一值', // 用于本地添加一条消息后 发给后台 后台生产消息后通过这个localId告诉我给这条消息加一个id
    threadId: 44, // 某组对话
    senderId: 44, // 发送者
    receiverId: 33, // 接受者
    // status: 1, // 1: 正在发送 2: 处理消息 3: 消息到达
    status: 1, // 1: 发送中 2: 成功 3：余额不足 4: 玩家不在线
    // 99: 处理超时 需要根据时间戳timestamp对比是否发送超时，如果超时手动重试，重新发送不要改动localId
    type: 1, // 1: 文本消息 2: 发货消息 3: 回收消息 4: 补货消息 99: 空消息
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?', // 1
    deliverMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    }, // 2
    receiptMsg: {
      conut: 1000,
      alipay: '', // 支付宝帐号
      wechat: '' // 微信帐号
    }, // 3
    suppleMsg: { // 补货结构和发货结构完全一致，区别在于补货是由管理员发送给运营人员
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    }, // 4
    timestamp: 1212123456 // 秒
  },
  {
    id: 12,
    thread: 21,
    sender: 'yunyinA',
    receiver: 'wanjiaA',
    msgType: 2,
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    packets: 'xxx',
    timestamp: 1212123456
  }
]

const user = {
  44: {
    id: 44,
    avatar: 1,
    serverName: 's1',
    charName: 'iu1'
  }
}
