import React, { Component } from 'react'
import { Drawer } from 'antd'
import './index.styl'
import AddChatter from './AddChatter'
import ChatterList from './ChatterList'
import MessageList from './MessageList'
import SubmitArea from './SubmitArea'
import { inject, observer } from 'mobx-react'
import { wsSend } from '@/websocket/index'

@inject('workIMStore')
@observer
export default class workIM extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    wsSend({
      rpcId: 'getMessagesAndUsers',
      data: null,
      success: (res) => {
        console.log(res.data)
      }
    })
  }

  render () {
    // 不能 { showHiddenDrawer } = this.props.workIMStore 找不到this
    const { workIMStore } = this.props
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
          <div className="rightTop">
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
  }
}
