const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })
const sendWsMsg = (rpcId, data) => {
  if (this.ws.readyState === 1) {
    this.ws.send(JSON.stringify({ rpcId: rpcId, data: data }))
  }
}

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

// 接收到websocket客户端的消息 根据rpcId返回相应数据
wss.on('connection', (ws) => {
  this.ws = ws

  // 服务端推送到客户端
  setTimeout(() => {
    sendWsMsg('receiveMessage', require('./receiveMessage')[0])
  }, 3000)
  setTimeout(() => {
    sendWsMsg('receiveMessage', require('./receiveMessage')[1])
  }, 5000)
  setTimeout(() => {
    sendWsMsg('receiveMessage', require('./receiveMessage')[2])
  }, 7000)

  ws.on('message', (message) => {
    setTimeout(() => {
      const json = JSON.parse(message)
      switch (json.rpcId) {
        case 'heartbeat':
          return sendWsMsg('heartbeat', 'heartbeat: WebSocket is connectted')
        case 'getMessagesAndUsersAndServerList':
          // 刷新进入页面加载所有message
          return sendWsMsg('getMessagesAndUsersAndServerList', require('./messagesAndUsersAndServerList'))
        case 'sendMessage':
          // 客户端发送message到服务端
          return sendWsMsg('sendMessage', sendMessageData(json.data))
        default:
          console.log('服务端：没有找到此消息对应的rpcId')
      }
    }, 1000)
  })
})
