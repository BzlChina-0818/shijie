/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Form, Button, Row, Col,Input,  Collapse } from 'antd'

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItem = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    style:{
      whiteSpace:'normal',
      lineHeight:'23px'
    }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    style:{width:'52%'}
  },
};
const Searchs={
  style:{
    width:200
  }
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
                  printingName,
                  queryName,
                  clearName,
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  function callback(key) {
  }
  const handleSubmit=()=>{
    let fields = getFieldsValue();
    onFilterChange(fields)
  }
  return (
    <Collapse defaultActiveKey={['1']} onChange={callback} >
      <Panel header="" key="1" showArrow={false}>
        <Row gutter={24}>
          <Col style={{position:'relative'}} span={8}>
            <Form>
              <FormItem {...formItemLayout}
                        label="打印池名称"
              >
                {getFieldDecorator('printingName',{initialValue: printingName})(<Input disabled style={{width:200}}/>)}
              </FormItem>
            </Form>
            <div style={{position:'absolute',right:'0px',top:'3px'}}><Button onClick={queryName} style={{marginRight:'2px'}} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
          </Col>
          <Col style={{position:'relative'}} span={8}>
            <Form>
              <FormItem {...formItemLayout}
                        label="打印池名称"
              >
                {getFieldDecorator('printingName',{initialValue: printingName})(<Input disabled style={{width:200}}/>)}
              </FormItem>
            </Form>
            <div style={{position:'absolute',right:'0px',top:'3px'}}><Button onClick={queryName} style={{marginRight:'2px'}} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
          </Col>
          <Col style={{position:'relative'}} span={8}>
            <Form>
              <FormItem {...formItemLayout}
                        label="发票打印员"
              >
                {getFieldDecorator('printingName',{initialValue: printingName})(<Input disabled style={{width:200}}/>)}
              </FormItem>
            </Form>
            <div style={{position:'absolute',right:'0px',top:'3px'}}><Button onClick={queryName} style={{marginRight:'2px'}} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
          </Col>
          <Col span={8} >
              <FormItem label="未盘点可以开票的期限(小时数)"   {...formItem} >
                {getFieldDecorator('nickName', {
                  initialValue: printingName,
                })(<Input />)}
              </FormItem>


          </Col>
          <Col  offset={8} span={8}><Button style={{marginRight:'2px'}} type="primary" onClick={handleSubmit} size='large'>查询</Button>
            <Button type="primary" size='large'>清除</Button></Col>
        </Row>
      </Panel>
    </Collapse>
  )
}

Filter.propTypes = {

}

export default Form.create()(Filter)
