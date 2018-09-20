import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.styl'
import AddChatter from './AddChatter'
import ChatterList from './ChatterList'
import MessageList from './MessageList'

export default class workIM extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className="workIM-wrap">
        <div className="left">
          <div className="leftTop">
            <AddChatter />
          </div>
          <div className="leftBottom">
            <div className="leftBottomWrap">
              <ChatterList />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="rightTop">
            <MessageList />
          </div>
          <div className="rightBottom">
            rightBottom
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}
