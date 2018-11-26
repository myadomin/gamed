import React, { Component } from 'react'
import { Drawer } from 'antd'
import './index.styl'
import AddChatter from './AddChatter'
import ChatterList from './ChatterList'
import MessageList from './MessageList'
import SubmitArea from './SubmitArea'
import { inject, observer } from 'mobx-react'
import { sendWs, recevieWs } from '@/websocket/index'

@inject('workIMStore')
@observer
export default class workIM extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    // 获取currentUser的所有message
    sendWs('getMessagesAndUsersAndServerList', this.props.workIMStore.currentUser, (data) => {
      this.props.workIMStore.setMessagesAndUsersAndServerList(data)
    })
    // 接收服务端推送过来的消息
    recevieWs('receiveMessage', (data) => {
      const { workIMStore } = this.props
      workIMStore.addMessagesAndUsers(data)
    })
  }

  render () {
    // 不能 { showHiddenDrawer } = this.props.workIMStore 找不到this
    const { workIMStore } = this.props
    // 必须等数据users messages形成再渲染页面
    if (workIMStore.users && workIMStore.messages.length) {
      return (
        <div className="workIM-wrap">
          <div className="left">
            <div className="leftTop">
              <AddChatter />
            </div>
            <div className="leftBottom">
              <div className="leftBottomWrap">
                <ChatterList/>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="rightTop" id="rightTop">
              <MessageList />
            </div>
            <div className="rightBottom">
              <SubmitArea showDrawer={() => workIMStore.showHiddenDrawer(true)} />
            </div>
          </div>
          <div style={{ clear: 'both' }}></div>
          <Drawer
            title="Create"
            width={720}
            placement="right"
            onClose={() => workIMStore.showHiddenDrawer(false)}
            visible={workIMStore.isShowDrawer}
          >
          </Drawer>
        </div>
      )
    } else {
      return ''
    }
  }
}
