 /* global document */
import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Collapse } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
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
const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const { id, invoiceCode, invoiceNumber,createTime,applyUser,status } = filter
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')];
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()

    fields[key] = values
    handleFields(fields)
   // onFilterChange(fields)

  }
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


  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="普通发票查验日志管理" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="查验申请编号">
                {getFieldDecorator('id', { initialValue:id})(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
            <FormItem {...formItemLayout} label="申请日期">
                {getFieldDecorator('createTime', { initialValue:"" })((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('createTimeRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票代码">
                {getFieldDecorator('invoiceCode', { initialValue: invoiceCode})(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票号码">
                {getFieldDecorator('invoiceNumber', { initialValue: invoiceNumber })(<Input />)}
              </FormItem>
            </Col>

              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="申请人">
                  {getFieldDecorator('applyUser', { initialValue: applyUser })(<Input />)}
                </FormItem>
              </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('status', { initialValue: status?status:'' })(
                <Select  onChange={handleChange.bind(null, 'status')}>
                  <Option value="">请选择</Option>
                  <Option value="1">成功</Option>
                  <Option value="2">失败</Option>
                </Select>)}
              </FormItem>
            </Col>

          </Row>
          <Row gutter={24}>
              <Col offset={16} span={8} className="button-col">
              <Button className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>
              </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default (Form.create()(Filter))
