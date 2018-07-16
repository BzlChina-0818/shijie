/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button,Collapse, Row, Col, Radio,DatePicker, Input, Select } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
// const { TextArea } = Input;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
}
const ColProps = {
  span:8,
  style: {
    marginBottom: 16,
  },
}
const formData={}
const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
//   const { datasourceCode, datasourceName, isValid } = filter

//   const handleFields = (fields) => {
//     const { createTime } = fields
//     if (createTime.length) {
//       fields.createTime = [createTime[0].format('X'),createTime[1].format('X')];
//     }
//     return fields
//   }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = ""
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
//   let initialCreateTime = []
//   if (filter.createTime) {
//     initialCreateTime[0] = moment.unix(filter.createTime[0])
//   }
//   if (filter.createTime) {
//     initialCreateTime[1] = moment.unix(filter.createTime[1])
//   }
//   console.log(initialCreateTime)
    function callback(key) {
        console.log(key);
    }
    function onChange1(date, dateString) {
        console.log(date, dateString);
      }
  return (
    <div className="condition-filter">
        <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
            <Panel header="手工开票查询" key="1">
            <Form>
                <Row gutter={24}>
                    <Col span={8}>
                    <FormItem label="日期类别"  {...formItemLayout}>
                    {getFieldDecorator('dataColCode', {
                        initialValue: 1,
                    })(<RadioGroup>
                        <Radio value={1}>当日信息</Radio>
                        <Radio value={2}>往日信息</Radio>
                      </RadioGroup>)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="日期范围"  {...formItemLayout}>
                        {getFieldDecorator('dataColName', {
                            initialValue: formData.dataColName,
                        })(<RangePicker onChange={onChange1} />)}
                        </FormItem>
                    </Col>
                        <Col span={8}>
                            <FormItem label="发票类型"  {...formItemLayout}>
                            {getFieldDecorator('outputType', {
                                initialValue: formData.outputType?formData.outputType:'',
                                rules: [
                                {
                                    required: true,
                                },
                                ],
                            })(<Select>
                                <Option value="">请选择</Option>
                                <Option value="0">增值税专用发票</Option>
                                <Option value="1">字符</Option>
                                <Option value="2">日期</Option>
                                <Option value="3">数字字典</Option>
                            </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="发票单号"  {...formItemLayout}>
                                {getFieldDecorator('formatMask', {
                                initialValue: formData.formatMask,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="购货单位名称"   {...formItemLayout}>
                                {getFieldDecorator('outputLength', {
                                initialValue: formData.outputLength,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="购货单位税号"   {...formItemLayout}>
                                {getFieldDecorator('sort', {
                                initialValue: formData.sort,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="发票审核状态"   {...formItemLayout}>
                                {getFieldDecorator('align', {
                                initialValue: formData.align? formData.align:'',
                                })(<Select>
                                <Option value="">请选择</Option>
                                <Option value="0">左对齐</Option>
                                <Option value="1">居中</Option>
                                <Option value="2">右对齐</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="发票起号码"   {...formItemLayout}>
                                {getFieldDecorator('outputLength', {
                                initialValue: formData.outputLength,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="发票止号码"   {...formItemLayout}>
                                {getFieldDecorator('sort', {
                                initialValue: formData.sort,
                                })(<Input />)}
                            </FormItem>

                        </Col>
                    </Row>
                </Form>
                <Row gutter={24}>
                    <Col offset={16} span={8} className="button-col">
                        <Button onClick={handleSubmit}>查询</Button>
                        <Button onClick={handleReset}>清除</Button>
                        <Button type="primary" onClick={handleReset}>更多检索</Button>
                    </Col>
                </Row>
            </Panel>
        </Collapse>

    </div>

  )
}

Filter.propTypes = {
//   form: PropTypes.object,
//   filter: PropTypes.object,
//   onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)



