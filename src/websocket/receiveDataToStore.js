export const receiveDataToStore = (json, wsStore) => {
  switch (json.rpcId) {
    case 'heartbeat':
      return console.log(json.data)
    case 'addMessage':
      wsStore.messageList.push(json.data)
      wsStore.index++
      return
    default:
      console.log('客户端：没有找到此消息对应的rpcId')
  }
}
