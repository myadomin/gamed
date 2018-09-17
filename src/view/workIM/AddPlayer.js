import React, { Component } from 'react'
import { Select, Input, Icon } from 'antd'

export default class AddPlayer extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div style={{ padding: '10px' }}>
        <Select placeholder="请选择服务器" style={{ margin: '0 0 10px 0', width: '100%' }}>
          <Select.Option value="Zhejiang">Zhejiang</Select.Option>
          <Select.Option value="Jiangsu">Jiangsu</Select.Option>
        </Select>
        <Input
          placeholder="请输入玩家姓名"
          addonAfter={<Icon type="plus" style={{ cursor: 'pointer' }} />}
        />
      </div>
    )
  }
}
