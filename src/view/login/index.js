import React, { Component } from 'react'
import MyFooter from '@/view/workSpace/MyFooter'
import { Layout, Form, Icon, Input, Button } from 'antd'
import { sendWs } from '@/websocket'
import { Redirect } from 'react-router-dom'
import { setStorageItem, getStorageItem } from '@/utils'

class Login extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
    console.log(1)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        sendWs('login', values, (data) => {
          setStorageItem('dToken', data)
          this.props.history.replace('/')
        })
      }
    })
  }

  render () {
    console.log('login')
    if (getStorageItem('dToken')) {
      return <Redirect replace to="/" />
    }
    const { Header, Content } = Layout
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    return (
      <Layout style={{ height: '100vh' }} id="login">
        <Content>
          <Form onSubmit={this.handleSubmit} className="login-form"
            style={{ width: '300px', margin: '150px auto 0' }}>
            <div style={{ color: '#1890ff', textAlign: 'center', fontSize: '28px', margin: '0 0 40px 0' }}>12121</div>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>Remember me</Checkbox>
              )} */}
              {/* <a className="login-form-forgot" href="" style={{ float: 'right' }}>Forgot password</a> */}
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                Log in
              </Button>
              {/* Or <a href="">register now!</a> */}
            </FormItem>
          </Form>
        </Content>
        <MyFooter />
      </Layout>
    )
  }
}

// Form.create包装后 this.props.form下面才有getFieldDecorator validateFields
const WrappedLogin = Form.create()(Login)
export default WrappedLogin
