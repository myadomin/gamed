let heartbeatTimer = null
let createTimer = null

// websocket初始化
const initWebsocket = () => {
  window.websocket = new window.WebSocket('ws://localhost:3001')
  // 连接上后开始发送心跳
  window.websocket.onopen = (evt) => {
    console.log('WebSocket connected!')
    window.clearInterval(heartbeatTimer)
    heartbeatTimer = window.setInterval(() => {
      wsSend({
        rpcId: 'heartbeat',
        data: new Date().getTime(),
        success: (res) => {
          console.log(res.data)
        }
      })
    }, 10000)
  }
  // 连接断开后重连
  window.websocket.onclose = (evt) => {
    window.clearInterval(createTimer)
    window.clearInterval(heartbeatTimer)
    createTimer = window.setInterval(() => {
      if (window.websocket && window.websocket.readyState === 1) {
        // 已与服务器建立连接 取消重连定时器
        window.clearInterval(createTimer)
      } else {
        console.log('websocket重连中........')
        initWebsocket()
      }
    }, 5000)
  }
  // 连接错误
  window.websocket.onerror = (evt) => {
    console.error('onerror: WebSocket连接服务器错误')
  }
}
initWebsocket()

// 客户端发送消息给服务端
const wsSend = (options) => {
  // 发送消息
  if (window.websocket && window.websocket.readyState === 1) {
    window.websocket.send(JSON.stringify({ rpcId: options.rpcId, data: options.data }))
  } else {
    console.error('不能发送消息，因为WebSocket没连接到服务器')
  }
  // 接收消息
  window.websocket.onmessage = (evt) => {
    options.success(JSON.parse(evt.data))
  }
}

export {
  initWebsocket,
  wsSend
}
