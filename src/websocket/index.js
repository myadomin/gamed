import React, { Component } from 'react'
import { receiveDataToStore } from './receiveDataToStore'
import { sendWsMsg } from './func'

// 封装websocket
let heartbeatTimer = null
let createTimer = null

const initWebsocket = (wsStore) => {
  window.websocket = new window.WebSocket('ws://localhost:3001')

  // 连接上后开始发送心跳
  window.websocket.onopen = (evt) => {
    console.log('WebSocket connected!')
    window.clearInterval(heartbeatTimer)
    window.store.map(item => {
      window.websocket.send(item)
    })
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
        console.log('清楚定时器')
        window.clearInterval(createTimer)
      } else {
        // 重连
        console.log('websocket重连中........')
        initWebsocket(wsStore)
      }
    }, 5000)
  }

  // 连接错误
  window.websocket.onerror = (evt) => {
    console.error('WebSocket连接服务器错误')
  }

  // 接收消息
  window.websocket.onmessage = (evt) => {
    // 接收websocket服务端数据 分发到wsStore里
    console.log(evt.data)
    receiveDataToStore(JSON.parse(evt.data), wsStore)
  }
}

export {
  initWebsocket
}
