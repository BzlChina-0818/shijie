 /* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
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
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'),createTime[1].format('YYYY-MM-DD')];
    }
    return fields
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    console.log(fields)
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
  }

  return (
    <div className="condition-filter">
      {/* <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1"> */}
          <Row gutter={24}>
          <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销货单位名称">
                {getFieldDecorator('salesName', { initialValue: '',
              })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票代码">
                {getFieldDecorator('invoiceCode', { initialValue: '',
              })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票号码">
                {getFieldDecorator('invoiceNum', { initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="购货单位名称">
                {getFieldDecorator('purchaseName', { initialValue: '',
              })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
              <FormItem {...formItemLayout} label="发票开票日期">
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
        {/* </Panel>
      </Collapse> */}
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)

