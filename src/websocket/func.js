window.store = []
// let aa = null
export const sendWsMsg = (rpcId, data) => {
  if (window.websocket.readyState === 1) {
    window.websocket.send(JSON.stringify({ rpcId: rpcId, data: data }))
  } else {
    window.store.push(JSON.stringify({ rpcId: rpcId, data: data }))
  }
}
