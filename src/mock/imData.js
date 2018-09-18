export const messageList = [
  {
    id: 1,
    // 用于本地添加一条消息后 发给后台 后台生产消息后通过这个localId告诉我给这条消息加一个id
    localId: '某个唯一值',
    // 某组对话
    threadId: 44,
    // 发送者
    senderId: 44,
    // 接受者
    // threadId永远是对方，也就是senderId receiverId中非threadId的那个是当前用户，一般是运营
    // 这条消息中senderId是对方 receiverId是当前用户 所以消息排列在左边
    receiverId: 33,
    // 1: 发送中 2: 成功 3：余额不足 4: 玩家不在线
    // 99: 处理超时 需要根据时间戳timestamp对比是否发送超时，如果超时手动重试，重新发送不要改动localId
    status: 1,
    // 1: 文本消息 2: 发货消息 3: 回收消息 4: 补货消息 99: 空消息(用于添加某个玩家到对话列表)
    type: 1,
    text: '1111Hey Jing, want to give a Flux talk at ForwardJS?',
    // 2: 发货消息 运营发钱对应的元宝给玩家
    // deliverMsg: {
    //   type: 'money', // 'money'
    //   count: 100000 // 单位是厘，显示为元除以1000
    // },
    // // 3: 回收消息 玩家发钱对应的元宝给运营回收
    // receiptMsg: {
    //   conut: 1000,
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
    id: 2,
    localId: '某个唯一值',
    // 这条消息中senderId是当前用户 receiverId是对方 所以消息排列在右边
    threadId: 44,
    senderId: 33,
    receiverId: 44,
    status: 1,
    type: 1,
    text: '2222似懂非懂分',
    timestamp: 1537280417091
  },
  {
    id: 3,
    localId: '某个唯一值',
    threadId: 44,
    senderId: 44,
    receiverId: 33,
    status: 1,
    type: 1,
    text: '3333斯蒂芬斯蒂芬斯斯蒂芬斯斯蒂芬斯蒂芬第三方',
    timestamp: 1537280417091
  },
  {
    id: 4,
    localId: '某个唯一值',
    threadId: 44,
    senderId: 33,
    receiverId: 44,
    status: 1,
    type: 1,
    text: '444Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: 1537280417091
  }
]

export const user = {
  44: {
    id: 44,
    avatar: 1,
    serverName: '游戏服王霸天下',
    charName: '玩家天下第一'
  }
}
