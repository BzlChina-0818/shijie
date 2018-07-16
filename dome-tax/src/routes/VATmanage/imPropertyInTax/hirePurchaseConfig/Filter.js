/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, Collapse } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
import GroupTreeModal from "routes/baseModule/groupTreeModal"

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
  modalVisible,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  let { groupNo="", status="", groupName=""} = filter
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
        dispatch({
          type: 'hirePurchaseConfig/showModal',
        })
      },
      onClear(){
        setFieldsValue({groupNo : "", groupName:""})
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
      setFieldsValue({groupNo : data.groupId, groupName:data.groupName})

      dispatch({
        type: 'hirePurchaseConfig/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'hirePurchaseConfig/hideModal',
      })
    },
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
      <Row gutter={24}>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="公司名称">
            {< ModalInputSearch
              {...modalInputSearchProps({
                name:'groupNo',
                initialDisplayValue:groupName,
                placeholder:'公司名称',
                initialValue:groupNo,
                displayName:'groupName'})} />}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="启用状态">
              {getFieldDecorator('status', { initialValue: status })(<Select>
                  <Option value="">请选择</Option>
                  <Option value="1">启用</Option>
                  <Option value="0">未启用</Option>
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
      {modalVisible&&<GroupTreeModal {...modalProps} />}

    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
