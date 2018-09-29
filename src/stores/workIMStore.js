import { observable, action } from 'mobx'

export class WorkIMStore {
  @observable isShowDrawer = false

  @action showHiddenDrawer (isShowDrawer) {
    this.isShowDrawer = isShowDrawer
  }
}

export default new WorkIMStore()
