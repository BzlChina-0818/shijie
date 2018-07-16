/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Collapse } from 'antd'
const { RangePicker } = DatePicker
const ButtonGroup = Button.Group;
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
  const { dataColCode, dataColName, isValid,createTime } = filter
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'),createTime[1].format('YYYY-MM-DD')];
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

  let initialCreateTime = []
  if (filter.createTime) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="输出定义查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="数据列代码">
                  {getFieldDecorator('dataColCode', { initialValue: dataColCode })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="数据列名称">
                {getFieldDecorator('dataColName', { initialValue: dataColName })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="是否启用">
                {getFieldDecorator('isValid', { initialValue: isValid?isValid:'' })(
                <Select  onChange={handleChange.bind(null, 'isValid')}>
                  <Option value="">请选择</Option>
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
            <FormItem {...formItemLayout} label="创建时间">
                {getFieldDecorator('createTime', { initialValue: '' })((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('createTimeRangePicker')
                  }}
                />))}
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

export default Form.create()(Filter)
