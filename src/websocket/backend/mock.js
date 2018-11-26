const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })
const sendWsMsg = (rpcId, data) => {
  if (this.ws.readyState === 1) {
    this.ws.send(JSON.stringify({ rpcId: rpcId, data: data }))
  }
}

// 进入页面 根据userId拿初始消息
const getMessagesAndUsersAndServerList = (data) => {
  console.log('开始拿取userId是' + data + '的初始消息')
  return require('./messagesAndUsersAndServerList')
}

// 后台接收消息后 处理消息
const sendMessageData = (data) => {
  // 补全id timestamp
  const now = new Date().getTime()
  data.message.id = now
  data.message.timestamp = now
  // 消息发送状态成功
  // data.message.status = 2
  // 存储超时，返回发送状态失败
  data.message.status = 3
  return data
}

// 后台接收登录后{userName: 'xxxx', password: 'xxx'} 处理登录 形成token返回给前端
const login = (data) => {
  const crypto = require('crypto')
  let nameAndPass = ''
  for (var i in data) {
    nameAndPass += data[i]
  }
  // todo userName和password经过处理加密成token, 最终能通过token解密出userName password
  const token = crypto.createHash('md5').update(nameAndPass, 'utf-8').digest('hex')
  return {
    token: token,
    userId: 2,
    userName: '老子是运营'
  }
}

// 登出
const logout = (data) => {
  return 'userId=' + data + '的logout后台已处理了'
}

// 接收到websocket客户端的消息 根据rpcId返回相应数据
wss.on('connection', (ws) => {
  this.ws = ws

  // 服务端推送到客户端
  // setTimeout(() => {
  //   sendWsMsg('receiveMessage', require('./receiveMessage')[0])
  // }, 3000)
  // setTimeout(() => {
  //   sendWsMsg('receiveMessage', require('./receiveMessage')[1])
  // }, 5000)
  // setTimeout(() => {
  //   sendWsMsg('receiveMessage', require('./receiveMessage')[2])
  // }, 7000)
  // setTimeout(() => {
  //   sendWsMsg('receiveMessage', require('./receiveMessage')[3])
  // }, 11000)
  // setTimeout(() => {
  //   sendWsMsg('receiveMessage', require('./receiveMessage')[4])
  // }, 19000)

  ws.on('message', (message) => {
    setTimeout(() => {
      const json = JSON.parse(message)
      switch (json.rpcId) {
        case 'heartbeat':
          return sendWsMsg('heartbeat', 'heartbeat: WebSocket is connectted')
        case 'getMessagesAndUsersAndServerList':
          // 刷新进入页面加载所有message
          return sendWsMsg('getMessagesAndUsersAndServerList', getMessagesAndUsersAndServerList(json.data))
        case 'sendMessage':
          // 客户端发送message到服务端
          return sendWsMsg('sendMessage', sendMessageData(json.data))
        case 'updateMessageReadToServer':
          return console.log('访问数据库修改这些message为已读', json.data)
        case 'login':
          // 登录处理
          return sendWsMsg('login', login(json.data))
        case 'logout':
          // 登录退出
          return sendWsMsg('logout', logout(json.data))
        default:
          console.log('服务端：没有找到此消息对应的rpcId')
      }
    }, 1000)
  })
})
