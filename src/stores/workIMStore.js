import { observable, action, computed } from 'mobx'

export class WorkIMStore {
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
  @action setMessages (messages) {
    this.messages = messages
    this.setCurrentChatter(messages[0].threadId)
  }
  @action setUsers (users) {
    this.users = users
  }
  @action.bound setCurrentChatter (id) {
    this.currentChatter = id
  }
}

export default new WorkIMStore()
