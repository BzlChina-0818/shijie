import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Cascader, Select, Row, Col, Input, Collapse, Button, DatePicker} from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
const Panel = Collapse.Panel;
const ColProps = {
  span:8,
  style: {
    marginBottom: 16,
  },
}
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
  const { functionCode, functionName, functionType="" } = filter
  const handleFields = (fields) => {
    const {startDate} = fields
    if (startDate.length) {
      fields.startDate = [startDate[0].format('YYYY-MM-DD'),startDate[1].format('YYYY-MM-DD')];
    }
    return fields
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
  if (filter.startDate) {
    initialCreateTime[0] = moment(filter.startDate[0])
  }
  if (filter.startDate) {
    initialCreateTime[1] = moment(filter.startDate[1])
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="功能定义" key="1">
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="功能代码:" hasFeedback >
            {getFieldDecorator('functionCode', {
              initialValue: functionCode
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="功能名称" hasFeedback >
            {getFieldDecorator('functionName', {
              initialValue: functionName
            })(<Input/>)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="功能类型" hasFeedback >
            {getFieldDecorator('functionType', {
              initialValue: functionType
            })(<Select >
              <Option value="">请选择</Option>
              <Option value="0">按钮</Option>
              <Option value="1">其他</Option>
            </Select>)}

          </FormItem>
        </Col>

        <Col {...ColProps} id="createTimeRangePicker">
          <FormItem {...formItemLayout}  label="创建时间">
            {getFieldDecorator('startDate',{
              initialValue: initialCreateTime
            } )((<RangePicker
              getCalendarContainer={() => {
                return document.getElementById('createTimeRangePicker')
              }}
            />))}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col offset={16} span={8}>
          <Button onClick={handleSubmit}>查询</Button>
          <Button onClick={handleReset}>清空</Button>
        </Col>
      </Row>
    </Panel>
    </Collapse>
    </div>
  )
}

Filter.propTypes = {}

export default Form.create()(Filter)
