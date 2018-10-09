import { observable, action } from 'mobx'

export class WorkIMStore {
  @observable isShowDrawer = false
  @observable messages = []
  @observable users = {}

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
  @action setMessages (messages) {
    this.messages = messages
  }
  @action setUsers (users) {
    this.users = users
  }
}

export default new WorkIMStore()
