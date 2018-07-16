/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;


const ColProps = {
  span:8,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  onFilterChange,
  onShowModal,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const { commodityName, commodityCode, taxItemNo } = filter


  const handleFields = (fields) => {
    // const { startDate } = fields
    // if (startDate.length) {
    //   fields.startDate = startDate[0].format('YYYY-MM-DD')
    //   fields.endDate = startDate[1].format('YYYY-MM-DD')
    // }
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
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }


  return (
    <div className="condition-filter">
      <Row gutter={24}>
        <Col {...ColProps} >
          <FilterItem  label="商品名称">
              {getFieldDecorator('commodityName', { initialValue: commodityName })(<Input />)}
          </FilterItem>
        </Col>
        <Col {...ColProps} >
          <FilterItem  label="商品代码">
            {getFieldDecorator('commodityCode', { initialValue: commodityCode })(<Input />)}
          </FilterItem>
        </Col>
        <Col {...ColProps} >
          <FilterItem  label="税目">
            {getFieldDecorator('taxItemNo', { initialValue: taxItemNo })(<Input />)}
          </FilterItem>
        </Col>
        {/*<Col {...ColProps} >*/}
          {/*<FilterItem  label="公司名称">*/}
            {/*{getFieldDecorator('voucher', { initialValue: voucher })(<Input />)}*/}
          {/*</FilterItem>*/}
        {/*</Col>*/}
      </Row>
      <Row gutter={24}>
        <Col offset={16} span={8}>
            <Button onClick={handleSubmit}>查询</Button>
            <Button onClick={handleReset}>清空</Button>
        </Col>
      </Row>
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
