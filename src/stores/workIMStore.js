import { observable, action, computed, autorun } from 'mobx'

export class WorkIMStore {
  // 当前用户 todo:登录后存入localstorage然后拿 现在假设是2 运营
  @observable currentUser = 2
  // 抽屉是否打开
  @observable isShowDrawer = false
  // 所有消息
  @observable messages = []
  // 消息所属用户
  @observable users = null
  // 服务器列表
  @observable serverList = []
  // 当前对话者id
  @observable currentChatter = null
  // 发货表单 钱
  @observable deliverMoney = ''
  @observable deliverRadioMoney = 100

  // constructor () {
  //   autorun(() => {
  //   })
  // }

  // 对话列表
  @computed get chartterList () {
    let chartterListIds = []
    this.messages.forEach(obj => {
      if (chartterListIds.indexOf(obj.threadId) === -1) {
        chartterListIds.push(obj.threadId)
      }
    })
    return chartterListIds.map(id => {
      // 每条对话的未读消息数量
      // 在所有消息中筛选当前对话message 然后再筛选这些message里isRead是false的消息
      this.users[id].unReadNum = this.messages
        .filter(obj => obj.threadId === id)
        .filter(obj => obj.isRead === false).length
      return this.users[id]
    })
  }
  // 当前消息列表
  @computed get currentMessages () {
    return this.messages.filter(item => item.threadId === this.currentChatter)
  }

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
  // 刷新进来设置messages users
  @action setMessagesAndUsersAndServerList (data) {
    this.messages = data.messages
    this.setCurrentChatter(this.messages[0].threadId)
    this.users = data.users
    this.serverList = data.serverList
  }
  // 添加一条消息
  @action addMessagesAndUsers (data) {
    this.messages.push(data.message)
    Object.assign(this.users, data.user || {})
  }
  // 修改localId对应的那条消息
  @action updateMessagesAndUsers (localId, data) {
    this.messages.forEach(item => {
      if (item.localId === localId) {
        Object.assign(item, data.message)
      }
    })
  }
  // 当前对话者
  @action.bound setCurrentChatter (id) {
    this.currentChatter = id
  }
  @action setDeliverMoney (money) {
    this.deliverMoney = money
  }
  @action setDeliverRadioMoney (money) {
    this.deliverRadioMoney = money
  }
}

export default new WorkIMStore()
