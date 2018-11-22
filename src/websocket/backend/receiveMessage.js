const receiveMessage = [
  {
    // 3->2（当前用户运营）
    message: {
      id: 113,
      localId: '某个唯一值',
      threadId: 3,
      senderId: 3,
      receiverId: 2,
      status: 2,
      isRead: false,
      type: 1,
      textMsg: '玩家-id-3发给我的文本1',
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
      status: 2,
      isRead: false,
      type: 1,
      textMsg: '玩家-id-4发给我的文本1',
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
  },
  {
    // 4->2（当前用户运营）
    message: {
      id: 115,
      localId: '某个唯一值',
      threadId: 4,
      senderId: 4,
      receiverId: 2,
      status: 2,
      isRead: false,
      type: 1,
      textMsg: '玩家-id-4发给我的文本2',
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
  },
  {
    // 3->2（当前用户运营）
    message: {
      id: 116,
      localId: '某个唯一值',
      threadId: 3,
      senderId: 3,
      receiverId: 2,
      status: 2,
      isRead: false,
      type: 1,
      textMsg: '玩家-id-3发给我的文本2',
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
    // 1->2（当前用户运营）
    message: {
      id: 117,
      localId: '某个唯一值',
      threadId: 1,
      senderId: 1,
      receiverId: 2,
      status: 2,
      isRead: false,
      type: 4,
      suppleMsg: {
        type: 'money', // 'money'
        count: 220000 // 单位是厘，显示为元除以1000
      },
      timestamp: 1537280417091
    },
    user: {
      1: {
        id: 1,
        avatar: 1,
        serverName: '游戏服王霸天下1',
        charName: '老子是管理员'
      }
    }
  }
]

module.exports = receiveMessage
