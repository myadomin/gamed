import React, { Component } from 'react'
import { Select, message, Icon } from 'antd'
import { sendWs } from '@/websocket/index'
import { inject, observer } from 'mobx-react'

@inject('workIMStore')
@observer
export default class AddChatter extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      // 服务器列表
      serverOptions: [],
      // 用户列表
      userOptions: [],
      // 选中的服务器
      serverValue: undefined,
      // 选中的用户
      userValue: undefined
    }
  }

  componentDidMount () {
    // 服务器列表 等待mock
    const mockServerList = [
      { value: 1, text: '王霸服1' },
      { value: 2, text: '王霸服2' },
      { value: 3, text: '王霸服3' },
      { value: 4, text: '王霸服4' }
    ]
    this.setState({ serverOptions: mockServerList })
  }

  render () {
    // 选择某个服务器后
    const selectServer = (value) => {
      this.setState({
        serverValue: value
      })
    }
    // 用户列表 等到mock
    const mockUserList = [
      { value: 4, text: '玩家-id-4' },
      { value: 5, text: '玩家-id-5' },
      { value: 6, text: '玩家-id-6' },
      { value: 7, text: '玩家-id-7' }
    ]
    const searchUser = (value) => {
      this.setState({ userOptions: mockUserList })
    }
    // 选择某个用户后
    const selectUser = (value) => {
      this.setState({
        userValue: value
      })
    }

    // 添加一个用户到用户列表
    const addUserToCharterList = () => {
      if (!this.state.serverValue) {
        return message.warning('请选择服务器')
      }
      if (!this.state.userValue) {
        return message.warning('请选择玩家')
      }
      sendMessageByNewChartter(this.state.serverValue, this.state.userValue)
    }

    // 新添加的用户 发送一条你好消息
    const sendMessageByNewChartter = (serverId, userId) => {
      const { workIMStore } = this.props
      const localId = new Date().getTime()
      const userIdNumber = Number(userId)
      const data = {
        message: {
          id: localId,
          localId: localId,
          threadId: userIdNumber,
          senderId: workIMStore.currentUser,
          receiverId: userIdNumber,
          status: 1,
          type: 1,
          textMsg: '你好'
        },
        user: {
          [userIdNumber]: {
            id: userIdNumber,
            avatar: 1,
            serverName: findTextByValue(this.state.serverOptions, serverId),
            charName: findTextByValue(this.state.userOptions, userId)
          }
        }
      }
      // 发送消息(正在发送) 先存入store在本地显示
      workIMStore.addMessagesAndUsers(data)
      // 选中刚被添加的用户
      workIMStore.setCurrentChatter(userIdNumber)
      sendWs('sendMessage', data, (data) => {
        // 发送后台 修改了message的id timestamp status ，通过localId找到store里的这条消息修改它
        // 根据status 可能成功失败等 无论成功失败不做回撤处理
        workIMStore.updateMessagesAndUsers(data.message.localId, data)
      })
    }

    // 通过value找text
    const findTextByValue = (list, value) => {
      let text = ''
      list.forEach((obj) => {
        if (obj.value === Number(value)) {
          text = obj.text
        }
      })
      return text
    }

    return (
      <div style={{ padding: '10px' }}>
        <Select placeholder="请选择服务器" style={{ margin: '0 0 10px 0', width: '100%' }} onChange={selectServer} >
          {this.state.serverOptions.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
        </Select>
        <Select
          placeholder="请搜索玩家"
          showSearch
          value={this.state.userValue}
          style={{ width: 220 }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={searchUser}
          onChange={selectUser}
        >
          {this.state.userOptions.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
        </Select>
        <Icon type="plus" style={{
          cursor: 'pointer',
          padding: '9px',
          float: 'right',
          background: '#ccc'
        }} onClick={addUserToCharterList}/>
      </div>
    )
  }
}
