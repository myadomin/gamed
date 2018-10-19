import { observable, action, computed } from 'mobx'

export class WorkIMStore {
  // 当前用户 todo:登录后存入localstorage然后拿 现在假设是2 运营
  @observable currentUser = 2
  // 抽屉是否打开
  @observable isShowDrawer = false
  // 所有消息
  @observable messages = []
  // 消息所属用户
  @observable users = null
  // 当前对话者id
  @observable currentChatter = null

  // 对话列表
  @computed get chartterList () {
    let chartterListIds = []
    this.messages.forEach(obj => {
      if (chartterListIds.indexOf(obj.threadId) === -1) {
        chartterListIds.push(obj.threadId)
      }
    })
    return chartterListIds.map(item => this.users[item])
  }
  // 当前消息列表
  @computed get currentMessages () {
    return this.messages.filter(item => item.threadId === this.currentChatter)
  }

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
  // 刷新进来设置messages users
  @action setMessagesAndUsers (data) {
    this.messages = data.messages
    this.setCurrentChatter(this.messages[0].threadId)
    this.users = data.users
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
    console.log(111, this.messages)
  }
  @action.bound setCurrentChatter (id) {
    this.currentChatter = id
  }
}

export default new WorkIMStore()
