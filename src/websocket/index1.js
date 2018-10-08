let heartbeatTimer = null
let createTimer = null

const heartbeat = () => {
  window.clearInterval(heartbeatTimer)
  heartbeatTimer = window.setInterval(() => {
    wsSend({
      rpcId: 'heartbeat',
      data: 'have heartbeat?',
      success: (res) => {
        // console.log('heartbeat----', res.data)
      }
    })
  }, 10000)
}

// 初始化websocket
const wsInit = (options) => {
  window.websocket = new window.WebSocket('ws://localhost:3001')
  // 连接上后开始发送心跳
  window.websocket.onopen = (evt) => {
    console.log('WebSocket connected!')
    heartbeat()
    // 重连没有option 不需要发消息
    options && wsSend(options)
  }
  // 连接断开后重连
  window.websocket.onclose = (evt) => {
    window.clearInterval(heartbeatTimer)
    window.clearInterval(createTimer)
    createTimer = window.setInterval(() => {
      if (window.websocket && window.websocket.readyState === 1) {
        // 已与服务器建立连接 取消重连定时器
        window.clearInterval(createTimer)
      } else {
        console.log('websocket重连中........')
        // 重连
        wsInit()
      }
    }, 5000)
  }
  // 连接错误
  window.websocket.onerror = (evt) => {
    console.error('onerror: WebSocket连接服务器错误')
  }
}

// websocket发送消息
const wsSend = (options) => {
  if (window.websocket) {
    console.log(1212)
    // 有WebSocket 直接发送消息
    if (window.websocket.readyState === 1) {
      window.websocket.send(JSON.stringify({ rpcId: options.rpcId, data: options.data }))
    }
  } else {
    // 没有WebSocket 创建WebSocket再发送消息
    wsInit(options)
  }
  // 接收消息
  window.websocket.onmessage = (evt) => {
    options.success(JSON.parse(evt.data))
  }
}

export {
  wsSend,
  wsInit
}
