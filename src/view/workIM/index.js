import React, { Component } from 'react'
import { Row, Col } from 'antd'
import s from './index.css'
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
      <div className={s.wrap}>
        <div className={s.left}>
          <div className={s.leftTop}>
            <AddChatter />
          </div>
          <div className={s.leftBottom}>
            <div className={s.leftBottomWrap}>
              <ChatterList />
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.rightTop}>
            <MessageList />
          </div>
          <div className={s.rightBottom}>
            rightBottom
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}
