import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux ,History} from 'dva/router'
import { connect } from 'dva'
import queryString from 'query-string'
import { Form, Input, Collapse, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

const FormItem = Form.Item
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

import { formValidMsg } from "utils"
import dataConfig from "../dataConfig"

const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
}
const formItemLayout1 = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 21,
    },
}
const FormContent=({
    onCreate,goBack,formData,pageType,search,dispatch,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
  console.log(formData)
  const {outputTypeList,alignList} = dataConfig
  const outputTypeListJSX = Object.keys(outputTypeList).map(key => <Option key={key} value={key}>{outputTypeList[key]}</Option>)
  const alignListJSX = Object.keys(alignList).map(key => <Option key={key} value={key}>{alignList[key]}</Option>)
    const save = () => {
        validateFields((errors) => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
          }
          onCreate(data)
        })
    }
    function onChange(date, dateString) {
      console.log(date, dateString);
    }

    //render
    return(
        <div>
            <div className="form-btn-group">
              <Button style={{marginRight:'5px'}} onClick={save} >保存</Button>
              <Button onClick={goBack}>返回</Button>
            </div>
          <Collapse className="collapse mb10" defaultActiveKey={['1']} >
            <Panel header="基本信息" key="1">
                <Form>
                <Row gutter={24}>
                    <Col span={8}>
                    <FormItem label="数据列代码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('dataColCode', {
                        initialValue: formData.dataColCode,
                        rules: [
                        {
                            required: true,
                            message:formValidMsg("数据列代码")
                        },
                        {
                          validator: (rule, value, callback, source, options) => {
                              let params = {
                                id:formData.id,
                                datasourceId:search.datasourceId,
                                dataColCode:value
                              }
                              dispatch({
                                type: 'outputFormatCreate/uniqueData',
                                payload:params,
                              }).then((data) => {
                                if(data.code===1010){
                                  callback(`数据列代码${value}已存在`);
                                }else {
                                  callback()
                                }
                              })
                          }
                        }
                        ],
                    })(<Input disabled={pageType=='update'}/>)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="数据列名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('dataColName', {
                            initialValue: formData.dataColName,
                            rules: [
                            {
                                required: true,
                                message:formValidMsg("数据列名称")
                            },
                            ],
                        })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="输出列别名" hasFeedback  {...formItemLayout}>
                          {getFieldDecorator('dataColnAme2', {
                            initialValue: formData.dataColnAme2,
                            rules: [
                              {
                                required: true,
                                message:formValidMsg("输出列别名")
                              },
                            ],
                          })(<Input />)}
                        </FormItem>
                    </Col>
                  <Col span={8}>
                      <FormItem label="输出类型" hasFeedback {...formItemLayout} >
                      {getFieldDecorator('outputType', {
                          initialValue: formData.outputType?formData.outputType:'1',
                          rules: [
                            {
                              required: true,
                            },
                          ],
                      })(<Select>
                        {outputTypeListJSX}
                      </Select>)}
                      </FormItem>
                  </Col>
                  <Col span={8}>
                      <FormItem label="格式掩码" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('formatMask', {
                          initialValue: formData.formatMask,
                        })(<Input />)}
                      </FormItem>
                  </Col>
                  <Col span={8}>
                        <FormItem label="输出长度" hasFeedback  {...formItemLayout}>
                          {getFieldDecorator('outputLength', {
                            initialValue: formData.outputLength,
                          })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="对齐方式" hasFeedback  {...formItemLayout}>
                          {getFieldDecorator('align', {
                            initialValue: formData.align? formData.align:'1',
                            rules: [
                              {
                                required: true,
                              },
                            ],
                          })(<Select>
                            {alignListJSX}
                          </Select>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="排序" hasFeedback  {...formItemLayout}>
                          {getFieldDecorator('sort', {
                            initialValue: formData.sort,
                            rules: [
                              {
                                required: true,
                                message:formValidMsg("排序")
                              },
                            ],
                          })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem label="是否启用" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('isValid', {
                          initialValue: formData.isValid?formData.isValid:'1',
                          rules: [
                            {
                              required: true,
                            },
                          ],
                          })(<RadioGroup>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                          </RadioGroup>)}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                      <FormItem label="是否为主键" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('isPk', {
                          initialValue: formData.isPk?formData.isPk+"":'0',
                          rules: [
                            {
                              required: true,
                            },
                          ],
                          })(<RadioGroup>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                          </RadioGroup>)}
                          </FormItem>
                      </Col>
                </Row>
            </Form>
            </Panel>
          </Collapse>
        </div>
    )
}
FormContent.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect((state) => ({outputFormatCreate: state.outputFormatCreate}))(Form.create()(FormContent));

