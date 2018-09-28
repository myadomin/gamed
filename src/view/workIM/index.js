import React, { Component } from 'react'
import { Drawer } from 'antd'
import './index.styl'
import AddChatter from './AddChatter'
import ChatterList from './ChatterList'
import MessageList from './MessageList'
import SubmitArea from './SubmitArea'

export default class workIM extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      isShowDrawer: false
    }
    this.closeDrawer = this.closeDrawer.bind(this)
    this.showDrawer = this.showDrawer.bind(this)
  }

  closeDrawer () {
    this.setState({ isShowDrawer: false })
  }

  showDrawer () {
    this.setState({ isShowDrawer: true })
  }

  render () {
    const { isShowDrawer } = this.state
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
            <SubmitArea showDrawer={this.showDrawer} />
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <Drawer
          title="Create"
          width={720}
          placement="right"
          onClose={this.closeDrawer}
          visible={isShowDrawer}
        >
        </Drawer>
      </div>
    )
  }
}
