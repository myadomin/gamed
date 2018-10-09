import { observable, action, computed } from 'mobx'

export class WorkIMStore {
  @observable isShowDrawer = false
  @observable messages = []
  @observable users = {}

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
}

export default new WorkIMStore()
