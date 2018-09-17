import React from 'react'
import { Menu, Dropdown, Icon, message, Avatar, Badge } from 'antd'

const GlobalHeader = () => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`)
  }

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1"><Icon type="user"/>个人中心</Menu.Item>
      <Menu.Item key="2"><Icon type="setting"/>个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3"><Icon type="logout"/>退出登录</Menu.Item>
    </Menu>
  )
  return (
    <div style={{ height: '100%', padding: '0 10px' }}>
      <Dropdown overlay={menu}>
        <div className="avatar-dropdown-link"
          style={{ float: 'right', height: '100%', cursor: 'pointer', padding: '0 20px' }}>
          <Avatar size="small" style={{
            color: '#fff',
            backgroundColor: '#1890ff',
            marginRight: '5px',
            float: 'left',
            marginTop: '20px'
          }}>U</Avatar>
          <span style={{
            whiteSpace: 'nowrap',
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            float: 'left'
          }}>我是大神啊</span>
          <Icon type="down" style={{
            float: 'left',
            margin: '26px 0 0 3px'
          }} />
        </div>
      </Dropdown>
      <span className="message-badge" style={{
        display: 'block',
        float: 'right',
        height: '100%',
        cursor: 'pointer',
        padding: '0px 20px'
      }}>
        <Badge count={21}>
          <Icon type="message" theme="outlined" style={{ color: '#1890ff', fontSize: '20px', margin: '5px' }} />
        </Badge>
      </span>
    </div>
  )
}

export default GlobalHeader
