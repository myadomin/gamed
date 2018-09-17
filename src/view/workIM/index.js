import React, { Component } from 'react'
import { Row, Col } from 'antd'
import s from './index.css'
import AddPlayer from './AddPlayer'

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
            <AddPlayer />
          </div>
          <div className={s.leftBottom}>
            <div className={s.leftBottomWrap}>
              <p style={{ height: '1000px' }}>player</p>
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.rightTop}>
            <div className={s.rightTopWrap}>
              <p style={{ height: '1000px' }}>chats</p>
            </div>
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
