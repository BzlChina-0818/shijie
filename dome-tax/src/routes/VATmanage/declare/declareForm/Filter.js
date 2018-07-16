/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, Collapse } from 'antd'
const { RangePicker, MonthPicker } = DatePicker
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
        <Panel header="增值税纳税申报表（汇总）查询" key="1">
        <Row gutter={24}>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="所属期间：">
                {getFieldDecorator('status', { initialValue: formData.sakk })(
                  <MonthPicker />
                )}
            </FormItem>
          </Col>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="编制单位：">
              {< ModalInputSearch
                {...modalInputSearchProps({
                  name:'groupNo',
                  initialDisplayValue:formData.groupName,
                  placeholder:'公司名称',
                  initialValue:formData.groupNo,
                  displayName:'groupName'})} />}
            </FormItem>
          </Col>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="计算表状态：">
                {getFieldDecorator('sda', { initialValue: formData.s })(
                  <Select>
                    <Option value="">请选择</Option>
                    <Option value="1">起草</Option>
                    <Option value="2">已批准</Option>
                    <Option value="3">已审批</Option>
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
