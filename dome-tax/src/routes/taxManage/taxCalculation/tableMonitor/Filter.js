/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, Collapse } from 'antd'
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
  let {deaconTypes,taxNos,deaconResults,} = filter
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD HH:mm:ss'),createTime[1].format('YYYY-MM-DD HH:mm:ss')];
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
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
      <Row gutter={24}>
        <Col {...ColProps} > 
          <FormItem {...formItemLayout} label="税种名称">
            {getFieldDecorator('taxNo', {
              initialValue: '',
            })(<Select placeholder='请选择'>
              <Option value="">请选择</Option>
              {taxNos && taxNos.map(item => {
                return <Option key={item.fldValue}>{item.dispValue}</Option>;
              })}
            </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps} id="createTimeRangePicker">
          <FormItem {...formItemLayout} label="开始执行时间">
          {getFieldDecorator('createTime', { initialValue: initialCreateTime })((<RangePicker
              getCalendarContainer={() => {
                return document.getElementById('createTimeRangePicker')
              }}
            />))}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="运行状态">
            {getFieldDecorator('deaconType', {
              initialValue: '',
            })(<Select placeholder='请选择'>
              <Option value="">请选择</Option>
              {deaconTypes && deaconTypes.map(item => {
                return <Option key={item.fldValue}>{item.dispValue}</Option>;
              })}
            </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="运行结果">
            {getFieldDecorator('deaconResult', {
              initialValue: '',
            })(<Select placeholder='请选择'>
              <Option value="">请选择</Option>
              {deaconResults && deaconResults.map(item => {
                return <Option key={item.fldValue}>{item.dispValue}</Option>;
              })}
            </Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col offset={16} span={8} className="button-col">
          <Button onClick={handleSubmit}>查询</Button>
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
