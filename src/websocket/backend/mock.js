const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })
const sendWsMsg = (rpcId, data) => {
  if (this.ws.readyState === 1) {
    this.ws.send(JSON.stringify({ rpcId: rpcId, data: data }))
  }
}

// 接收到websocket客户端的消息 根据rpcId返回相应数据
wss.on('connection', (ws) => {
  this.ws = ws
  // setInterval(() => {
  //   sendWsMsg('setIntervalData', 'setIntervalData')
  // }, 2000)
  ws.on('message', (message) => {
    const json = JSON.parse(message)
    switch (json.rpcId) {
      case 'heartbeat':
        return sendWsMsg('heartbeat', 'heartbeat: WebSocket is connectted')
      case 'getMessagesAndUsers':
        return sendWsMsg('getMessagesAndUsers', require('./messagesAndUsers'))
      case 'test':
        return sendWsMsg('test', 'test')
      default:
        console.log('服务端：没有找到此消息对应的rpcId')
    }
  })
})
