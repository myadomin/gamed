import * as func from './receiveDataToStore'

let heartbeatTimer = null
let createTimer = null
let websocketStore = []

const sendWsMsg = (rpcId, data) => {
  if (window.websocket.readyState === 1) {
    window.websocket.send(JSON.stringify({ rpcId: rpcId, data: data }))
  } else {
    // 如果WebSocket还没连接上 先存入websocketStore
    websocketStore.push(JSON.stringify({ rpcId: rpcId, data: data }))
  }
}

const initWebsocket = (WorkIMStore) => {
  window.websocket = new window.WebSocket('ws://localhost:3001')

  // 连接上后开始发送心跳
  window.websocket.onopen = (evt) => {
    console.log('WebSocket connected!')
    window.clearInterval(heartbeatTimer)
    // 发送未连接上之前存入websocketStore的消息
    websocketStore.map(item => {
      window.websocket.send(item)
    })
    // 清空 避免重连再发送消息
    websocketStore = []
    heartbeatTimer = window.setInterval(() => {
      sendWsMsg('heartbeat', new Date().getTime())
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
        // 重连
        console.log('websocket重连中........')
        initWebsocket(WorkIMStore)
      }
    }, 5000)
  }

  // 连接错误
  window.websocket.onerror = (evt) => {
    console.error('WebSocket连接服务器错误')
  }

  // 接收消息
  window.websocket.onmessage = (evt) => {
    // 接收websocket服务端数据 分发到WorkIMStore里
    const json = JSON.parse(evt.data)
    if (typeof func[json.rpcId] === 'function') {
      func[json.rpcId](json.data, WorkIMStore)
    }
  }
}

export {
  initWebsocket,
  sendWsMsg
}
