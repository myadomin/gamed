import React from 'react'
import { Layout, Menu, Dropdown, Icon, message, Avatar } from 'antd'

const MyHeader = () => {
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
    <Layout.Header style={{ background: '#fff', padding: 0 }}>
      <div style={{ height: '100%', padding: '0 10px' }}>
        <Dropdown overlay={menu}>
          <div className="layout-avatar-dropdown-link"
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
            }}>老子是运营</span>
            <Icon type="down" style={{
              float: 'left',
              margin: '26px 0 0 3px'
            }} />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  )
}

export default MyHeader