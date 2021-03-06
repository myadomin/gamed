const messages = [
  {
    id: 11,
    // 用于本地添加一条消息后 发给后台 后台生产消息后通过这个localId告诉我给这条消息加一个id
    localId: 11,
    // 某组对话
    // threadId永远是对方，如果senderId = threadId，说明senderId是对方 receiverId是当前用户
    // 例如 这条消息中senderId是对方 receiverId是当前用户 所以消息排列在左边
    threadId: 3,
    // 发送者
    senderId: 3,
    // 接受者
    receiverId: 2,
    // 1: 发送中 2: 成功 3:失败 4余额不足 5:玩家不在线
    // 99: 处理超时 需要根据时间戳timestamp对比是否发送超时，如果超时手动重试，重新发送不要改动localId
    status: 2,
    // 1: 文本消息 2: 发货消息 3: 回收消息 4: 补货消息 99: 空消息(用于添加某个玩家到对话列表)
    type: 1,
    isRead: true,
    textMsg: '此条用于说明字段意思',
    // 2: 发货消息 运营发钱对应的元宝给玩家
    // deliverMsg: {
    //   type: 'money', // 'money'
    //   count: 100000 // 单位是厘，显示为元除以1000
    // },
    // // 3: 回收消息 玩家发钱对应的元宝给运营回收
    // receiptMsg: {
    //   conut: 1000, // 单位是厘，显示为元除以1000
    //   alipay: '', // 支付宝帐号
    //   wechat: '' // 微信帐号
    // },
    // // 4: 补货结构和发货结构完全一致，区别在于补货是由管理员发送给运营人员
    // suppleMsg: {
    //   type: 'money', // 'money'
    //   count: 100000 // 单位是厘，显示为元除以1000
    // },
    timestamp: 1537280417091 // 秒
  },
  {
    id: 12,
    localId: 12,
    threadId: 3,
    senderId: 2,
    receiverId: 3,
    status: 4,
    // 这条文本消息中senderId是当前用户 receiverId是对方 所以消息排列在右边
    type: 1,
    isRead: true,
    textMsg: '我发给对方的文本',
    timestamp: 1537280417091
  },
  {
    id: 13,
    localId: 13,
    threadId: 3,
    senderId: 3,
    receiverId: 2,
    status: 5,
    // 这条文本消息中senderId是对方 receiverId是当前用户 所以消息排列在左边
    type: 1,
    isRead: true,
    textMsg: '对方发给我的文本',
    timestamp: 1537280417091
  },
  {
    id: 14,
    localId: 14,
    threadId: 3,
    senderId: 2,
    receiverId: 3,
    status: 3,
    // 这条文本消息中senderId是当前用户 receiverId是对方 所以消息排列在右边
    type: 1,
    isRead: false,
    textMsg: '待重发的消息',
    timestamp: 1537280417091
  },
  {
    id: 21,
    localId: 21,
    threadId: 3,
    senderId: 2,
    receiverId: 3,
    status: 2,
    type: 2,
    isRead: true,
    // 发货消息 运营发钱对应的元宝给玩家 senderId一定是当前用户(运营) receiverId一定是对方(玩家) 排列在右边
    deliverMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    },
    timestamp: 1537280417091
  },
  {
    id: 31,
    localId: 31,
    threadId: 3,
    senderId: 3,
    receiverId: 2,
    status: 2,
    type: 3,
    isRead: true,
    // 回收消息 玩家发钱对应的元宝给运营回收 senderId一定是对方(玩家) receiverId一定是当前用户(运营) 排列在左边
    receiptMsg: {
      count: 143590,
      alipay: { account: 'sfsd@alipay.com', username: '阿里' },
      wechat: '18666663254'
    },
    timestamp: 1537280417091
  },
  // {
  //   id: 41,
  //   localId: 41,
  //   threadId: 2,
  //   senderId: 1,
  //   receiverId: 2,
  //   status: 2,
  //   type: 4,
  //   isRead: true,
  //   // 补货是由管理员发送给运营人员 所以senderId一定是管理员
  //   // 这条消息中senderId是当前用户(管理员) receiverId是对方(运营) 所以消息排列在右边
  //   // 我管理员给运营xxx补货xxx
  //   suppleMsg: {
  //     type: 'money', // 'money'
  //     count: 100000 // 单位是厘，显示为元除以1000
  //   },
  //   timestamp: 1537280417091
  // },
  {
    id: 42,
    localId: 42,
    threadId: 1,
    senderId: 1,
    receiverId: 2,
    status: 2,
    type: 4,
    isRead: true,
    // 这条消息中senderId是对方(管理员) receiverId是当前用户(运营) 所以消息排列在左边
    // 我运营收到管理员xxx的补货xxx
    suppleMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    },
    timestamp: 1537280417091
  }
  // {
  //   id: 91,
  //   localId: 91,
  //   threadId: 3,
  //   senderId: 2,
  //   receiverId: 3,
  //   status: 2,
  //   // 空消息
  //   type: 99,
  //   timestamp: 1537280417091
  // }
]

const users = {
  // 管理员
  1: {
    id: 1,
    avatar: 1,
    serverName: '游戏服王霸天下1',
    charName: '老子是管理员'
  },
  // 运营
  2: {
    id: 2,
    avatar: 1,
    serverName: '游戏服王霸天下2',
    charName: '老子是运营'
  },
  // 玩家
  3: {
    id: 3,
    avatar: 1,
    serverName: '游戏服王霸天下3',
    charName: '玩家-id-3'
  }
}

const serverList = [
  { value: 1, text: '王霸服1' },
  { value: 2, text: '王霸服2' },
  { value: 3, text: '王霸服3' },
  { value: 4, text: '王霸服4' },
  { value: 5, text: '王霸服5' }
]

const messagesAndUsersAndServerList = {
  messages,
  users,
  serverList
}

module.exports = messagesAndUsersAndServerList
