import { observable, action } from 'mobx'

export class WorkIMStore {
  @observable isShowDrawer = false
  @observable messagesAndUsers = null

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
}

export default new WorkIMStore()
