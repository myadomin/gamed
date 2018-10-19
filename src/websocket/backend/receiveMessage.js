const receiveMessage = [
  {
    // 3->2（当前用户运营）
    message: {
      id: 113,
      localId: '某个唯一值',
      threadId: 3,
      senderId: 3,
      receiverId: 2,
      status: 1,
      type: 1,
      textMsg: '玩家-id-3发给我的文本',
      timestamp: 1537280417091
    },
    user: {
      3: {
        id: 3,
        avatar: 1,
        serverName: '游戏服王霸天下',
        charName: '玩家-id-3'
      }
    }
  },
  {
    // 4->2（当前用户运营）
    message: {
      id: 114,
      localId: '某个唯一值',
      threadId: 4,
      senderId: 4,
      receiverId: 2,
      status: 1,
      type: 1,
      textMsg: '玩家-id-4发给我的文本',
      timestamp: 1537280417091
    },
    user: {
      4: {
        id: 4,
        avatar: 1,
        serverName: '游戏服abc',
        charName: '玩家-id-4'
      }
    }
  }
]

module.exports = receiveMessage
