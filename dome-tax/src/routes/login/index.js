import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon } from 'antd'
import { config } from 'utils'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  return (
    <div className={styles.form}>
      <div className="">

      </div>
      <div className="">
        <div className={styles.logo}>
          <img alt="logo" src={config.logo} />
          <div className="">
            <h2>税务管理系统</h2>
            <span>TAX MANAGEMENT SYSTEM</span>
          </div>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input onPressEnter={handleOk}
                      placeholder="请输入手机号码"
                      prefix={<Icon type="user" />}/>)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="password"
                      onPressEnter={handleOk}
                      placeholder="请输入密码"
                      prefix={<Icon type="lock" />}/>)}
          </FormItem>
          <Row>
            <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
              登 录
            </Button>
          </Row>
        </form>
      </div>

    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
