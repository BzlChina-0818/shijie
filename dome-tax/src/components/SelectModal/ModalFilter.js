/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { unix2Locale } from 'utils'
import { FilterItem,FormInputOrSelect} from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const ColProps = {
  span:10,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
    ...filters,
//   ...filterConfig,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
//   const { commodityName, commodityCode, taxItemNo } = {}
//   const {filterConfig}=filterConfig
    let formValue = {
      MonthPickerValue:null,
      InputValue:null,
      ModalInputSearchValue:null,
      RadioValue:null
    }
    const {filter,filterLeft,filterRight, filterFlagBtn, onOk}=filters
    const fromData = {}
    const handleFields = (fields) => {
        const { startDate } = fields
        if (startDate.length) {
        fields.startDate = startDate[0].format('YYYY-MM-DD')
        fields.endDate = startDate[1].format('YYYY-MM-DD')
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
                fields[item] = undefined
                }
            }
        }
      setFieldsValue(fields)
      handleSubmit()
    }

    const fromChange = (e,fromValue) => {
      if(fromValue === 'MonthPickerValue'){
        formValue[fromValue] = e.format('YYYY-MM');
      }else{
        formValue[fromValue] = e.target.value;
      }
    }

    const filterLeftClick = () => {
      filterLeft ? filterLeft.click(formValue) : null;
    }

    const filterRightClick = () => {
      filterRight ? filterRight.click() : null
    }
  return (
    <div className="condition-filter">
      <Row gutter={24}>
        {filter.map((item,index)=>
            <Col {...ColProps} key={index}>
              <FilterItem label={item.label}>
                {getFieldDecorator(item.formName,{ initialValue: fromData[item.formName] })(<FormInputOrSelect getFieldDecorator={getFieldDecorator} Radios={item.Radios} options={item.options} fromChange={fromChange} type={item.type} typeName={item.typeName}/>)}
              </FilterItem>
            </Col>
        )}
      </Row>
      {!filterFlagBtn && <Row gutter={24}>
        <Col offset={16} span={8}>
            <Button onClick={filterLeftClick}>{filterLeft ? filterLeft.text : '查询'}</Button>
            <Button onClick={filterRightClick}>{(filterRight && filterRight.text) ? filterRight.text : '清空'}</Button>
        </Col>
      </Row>}

    </div>
  )
}

Filter.propTypes = {
  filters: PropTypes.object,
  filterLeft: PropTypes.object,
  filterRight:PropTypes.object,
}

export default Form.create()(Filter)
