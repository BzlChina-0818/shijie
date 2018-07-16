/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, Collapse } from 'antd'
const { RangePicker, MonthPicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;

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
  modalVisible,
  formData,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  
  const handleFields = (fields) => {
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
    handleSubmit()
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,initialDisplayValue,displayName}) =>{
    return {
      onSearchModal(){
        
      },
      onClear(){
        
      },
      options:{
        name,
        displayName,
        placeholder,
        initialValue,
        initialDisplayValue,
        getFieldDecorator
      }
    }
  }
  const modalProps = {
    onOk (data) {
    

     
    },
    onCancel () {
     
    },
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="不动产进项税分期抵扣汇总" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FilterItem {...formItemLayout} label="纳税人识别号：">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name:'groupNo',
                    initialDisplayValue:formData.groupName,
                    placeholder:'纳税人识别号',
                    initialValue:formData.groupNo,
                    displayName:'groupName'})} />}
              </FilterItem>
            </Col>
            <Col {...ColProps} >
              <FilterItem {...formItemLayout} label="启用状态">
                  {getFieldDecorator('status', { initialValue: formData.status })(<Input disabled/>)}
              </FilterItem>
            </Col>
            <Col {...ColProps} >
              <FilterItem {...formItemLayout} label="启用状态">
                  {getFieldDecorator('status', { initialValue: formData.status })(<MonthPicker />)}
              </FilterItem>
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
