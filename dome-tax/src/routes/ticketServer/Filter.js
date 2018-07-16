/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
// import {FilterInput} from 'components'
import { Form, Button, Row, Col,Input,  Collapse } from 'antd'

// const  Search  = Input.Search
const Panel = Collapse.Panel;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      style:{
          marginBottom:0
      }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const Filter = ({
    filterObject,
    queryName,
    clearName,
    onFilterChange,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...filterProps
}) => {
    function callback(key) {
        console.log(key);
      }
  const handleSubmit=()=>{
    let fields = getFieldsValue();
    onFilterChange(fields)
  }
  return (
      <div className="condition-filter ticket-server">
          <Row gutter={24}>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem {...formItemLayout}
                      label="纳税人识别号" hasFeedback
                  >
                      {getFieldDecorator('printingName', { initialValue: filterObject.printingName })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              <Col span={8}>
                  <FormItem label="纳税主体名称" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                          //   rules: [
                          //       {
                          //           required: true,
                          //       },
                          //   ],
                      })(<Input />)}
                  </FormItem>
              </Col>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem label="开票服务器名称" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                        //   rules: [
                        //       {
                        //           required: true,
                        //       },
                        //   ],
                      })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem label="税务专员" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                        //   rules: [
                        //       {
                        //           required: true,
                        //       },
                        //   ],
                      })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem label="打印终端名称" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                        //   rules: [
                        //       {
                        //           required: true,
                        //       },
                        //   ],
                      })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem label="打印池名称" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                        //   rules: [
                        //       {
                        //           required: true,
                        //       },
                        //   ],
                      })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              <Col style={{ position: 'relative' }} span={8}>
                  <FormItem label="发票打印员" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('nickName', {
                          initialValue: filterObject.printingName,
                        //   rules: [
                        //       {
                        //           required: true,
                        //       },
                        //   ],
                      })(<Input disabled style={{ width: 195 }} />)}
                  </FormItem>
                  <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
              </Col>
              
          </Row>
          <Row gutter={24}>
              <Col span={8} offset={16}>
                  <Button style={{ marginRight: '2px' }} type="primary"  >查询</Button>
                  <Button type="primary" >清除</Button>
              </Col>
          </Row>
      </div>     
  )
}

Filter.propTypes = {
  
}

export default Form.create()(Filter)
