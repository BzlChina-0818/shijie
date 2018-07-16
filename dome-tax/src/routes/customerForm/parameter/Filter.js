import React from 'react'
import moment from 'moment'
import {FilterItem,ModalInputSearch} from 'components'
import {Form, DatePicker, Select, Row, Col, Input, Collapse, Button} from 'antd'
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker
const Option = Select.Option
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
  const { parameterCode, parameterName ,parameterType=""} = filter
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('X'), createTime[1].format('X')]
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
  if (filter.createTime) {
    initialCreateTime[0] = moment.unix(filter.createTime[0])
  }
  if (filter.createTime) {
    initialCreateTime[1] = moment.unix(filter.createTime[1])
  }
  return (
<div className="condition-filter">
  <Collapse className="collapse" defaultActiveKey={['1']} >
    <Panel header="数据源参数定义" key="1">
  <Row gutter={24}>
    <Col {...ColProps}>
      <FormItem {...formItemLayout} label="参数代码:" hasFeedback >
        {getFieldDecorator('parameterCode', {
          initialValue:parameterCode
        })(<Input/>)}
      </FormItem>
    </Col>
    <Col {...ColProps}>
      <FormItem {...formItemLayout} label="参数名称" hasFeedback >
        {getFieldDecorator('parameterName', {
          initialValue:parameterName
        })(<Input />)}

      </FormItem>
    </Col>
    <Col {...ColProps}>
      <FormItem {...formItemLayout} label="参数类型" hasFeedback >
        {getFieldDecorator('parameterType', {
          initialValue:parameterType
        })(<Select>
          <Option value="">请选择</Option>
          <Option value="1">数字</Option>
          <Option value="2">字符</Option>
          <Option value="3">日期</Option>
        </Select>)}
      </FormItem>
    </Col>
    <Col {...ColProps} id="createTimeRangePicker">
      <FormItem {...formItemLayout}  label="创建时间">
        {getFieldDecorator('createTime',{
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
