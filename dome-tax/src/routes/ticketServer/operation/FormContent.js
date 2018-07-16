import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, InputNumber,Select, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import ButtonGroup from './ButtonGroup'
// import styles from './index.less'
import city from '../../../utils/city'
const FormItem = Form.Item
// const ButtonGroup = Button.Group;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16, 
    },
  }
const FormContent=({
    item,
    save,
    back,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      ...formProps,
      queryName,
      clearName
})=>{
    const handForm=()=>{
        validateFields((errors) => {
                if (errors) {
                return
                }
                const data = {
                ...getFieldsValue(),
                }
                console.log(data)
            }) 
    }
    const saveData = () => {
        validateFields((errors) => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
          }
          save(data)
        })
    }
    const goBack=()=>{
        back()
    }
    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
    return(
        <div>
            {/* <ButtonGroup {...buttonProps}/> */}
            <Button style={{marginRight:'5px'}} type="primary" onClick={saveData} icon="save-circle">保存</Button>
            <Button type="primary" onClick={goBack} icon="left-circle">返回</Button>
            <div>开票服务器信息维护维护</div>
            <div className="condition-filter ticket-server">
                <Row gutter={24}>
                        <Col style={{ position: 'relative' }} span={8}>
                            <FormItem {...formItemLayout}
                                label="纳税主体名称" hasFeedback
                            >
                                {getFieldDecorator('printingName', { initialValue: item.printingName,
                                    rules: [
                                          {
                                              required: true,
                                          },
                                      ]})(<Input  style={{ width: 195 }} />)}
                            </FormItem>
                            <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
                        </Col>
                        <Col span={8}>
                            <FormItem label="纳税人识别号" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input  />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="金税盘编号" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.select,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="开票服务器代码" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="开票服务器名称" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>
                           
                        </Col>
                        <Col span={8}>
                            <FormItem label="金税盘名称" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>    
                        </Col>
                        <Col span={8}>
                            <FormItem label="发票限额版本" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('version', {
                                    initialValue: item.version,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Select initialValue="">
                                    <Option value="">请选择</Option>
                                    <Option value="1">万元版</Option>
                                    <Option value="2">十万元版</Option>
                                    <Option value="3">百万元版</Option>
                                    <Option value="4">千万元版</Option>
                                    <Option value="5">亿元版</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="分发服务器IP" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>    
                        </Col>
                        <Col span={8}>
                            <FormItem label="是否主开票服务器" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
                                {getFieldDecorator('biaoShi', {
                                    initialValue: item.biaoShi,
                                    rules: [
                                        {
                                            required: true,
                                            type: 'boolean',
                                        },
                                    ],
                                })(<Radio.Group>
                                    <Radio value>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="详细地址" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                    rules: [
                                        {
                                            required: true,
                                        },
                                    ],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="主开票服务器" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('version', {
                                    initialValue: item.version,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Select initialValue="">
                                    <Option value="">请选择</Option>
                                    <Option value="1">万元版</Option>
                                    <Option value="2">十万元版</Option>
                                    <Option value="3">百万元版</Option>
                                    <Option value="4">千万元版</Option>
                                    <Option value="5">亿元版</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="接受服务器" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                    rules: [
                                        {
                                            required: true,
                                        },
                                    ],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col style={{ position: 'relative' }} span={8}>
                            <FormItem label="税务专员" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: item.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input disabled style={{ width: 195 }} />)}
                            </FormItem>
                            <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
                        </Col>
                        <Col span={8}>
                            <FormItem label="启用标识" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
                                {getFieldDecorator('biaoShi', {
                                    initialValue: item.biaoShi,
                                    rules: [
                                        {
                                            required: true,
                                            type: 'boolean',
                                        },
                                    ],
                                })(<Radio.Group>
                                    <Radio value>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="开始使用时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('createTime',config,{
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                },
                            ],
                        })(                            
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="结束使用时间" hasFeedback  {...formItemLayout}>
                        {getFieldDecorator('endTime',config,{
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                },
                            ],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Form.create()(FormContent)