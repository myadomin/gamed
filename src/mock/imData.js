export const messageList = [
  {
    id: 11,
    // 用于本地添加一条消息后 发给后台 后台生产消息后通过这个localId告诉我给这条消息加一个id
    localId: '某个唯一值',
    // 某组对话
    // threadId永远是对方，如果senderId = threadId，说明senderId是对方 receiverId是当前用户
    // 例如 这条消息中senderId是对方 receiverId是当前用户 所以消息排列在左边
    threadId: 44,
    // 发送者
    senderId: 44,
    // 接受者
    receiverId: 33,
    // 1: 发送中 2: 成功 3：余额不足 4: 玩家不在线
    // 99: 处理超时 需要根据时间戳timestamp对比是否发送超时，如果超时手动重试，重新发送不要改动localId
    status: 1,
    // 1: 文本消息 2: 发货消息 3: 回收消息 4: 补货消息 99: 空消息(用于添加某个玩家到对话列表)
    type: 1,
    text: '此条用于说明字段意思',
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
    localId: '某个唯一值',
    // 这条消息中senderId是当前用户 receiverId是对方 所以消息排列在右边
    threadId: 44,
    senderId: 33,
    receiverId: 44,
    status: 1,
    type: 1,
    text: '我发给对方的文本',
    timestamp: 1537280417091
  },
  {
    id: 13,
    localId: '某个唯一值',
    // 这条消息中senderId是对方 receiverId是当前用户 所以消息排列在左边
    threadId: 44,
    senderId: 44,
    receiverId: 33,
    status: 1,
    type: 1,
    text: '对方发给我的文本',
    timestamp: 1537280417091
  },
  {
    id: 21,
    localId: '某个唯一值',
    threadId: 44,
    senderId: 33,
    receiverId: 44,
    status: 1,
    type: 2,
    // 发货消息 运营发钱对应的元宝给玩家 senderId一定是当前用户(运营) receiverId一定是对方(玩家)
    deliverMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    },
    timestamp: 1537280417091
  },
  {
    id: 31,
    localId: '某个唯一值',
    threadId: 44,
    senderId: 44,
    receiverId: 33,
    status: 1,
    type: 3,
    // 回收消息 玩家发钱对应的元宝给运营回收 senderId一定是对方(玩家) receiverId一定是当前用户(运营)
    receiptMsg: {
      count: 143590,
      alipay: 'sfsd@alipay.com',
      wechat: '18666663254'
    },
    timestamp: 1537280417091
  },
  {
    id: 41,
    localId: '某个唯一值',
    threadId: 33,
    senderId: 22,
    receiverId: 33,
    status: 1,
    type: 4,
    // 补货是由管理员发送给运营人员, senderId receiverId都可能是当前用户(管理员) 类似普通消息 可能左右排列
    // 这条消息中senderId是当前用户(管理员) receiverId是对方(运营) 所以消息排列在右边
    // 我给运营xxx补货xxx 我是管理员
    suppleMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    },
    timestamp: 1537280417091
  },
  {
    id: 42,
    localId: '某个唯一值',
    threadId: 22,
    senderId: 22,
    receiverId: 33,
    status: 1,
    type: 4,
    // 这条消息中senderId是对方(管理员) receiverId是当前用户(运营) 所以消息排列在左边
    // 我收到管理员xxx的补货xxx 我是运营
    suppleMsg: {
      type: 'money', // 'money'
      count: 100000 // 单位是厘，显示为元除以1000
    },
    timestamp: 1537280417091
  }
]

export const user = {
  // 管理员
  22: {
    id: 33,
    avatar: 1,
    serverName: '游戏服王霸天下',
    charName: '老子是管理员'
  },
  // 运营
  33: {
    id: 33,
    avatar: 1,
    serverName: '游戏服王霸天下',
    charName: '老子是运营'
  },
  // 玩家
  44: {
    id: 44,
    avatar: 1,
    serverName: '游戏服王霸天下',
    charName: '玩家天下第一'
  }
}
