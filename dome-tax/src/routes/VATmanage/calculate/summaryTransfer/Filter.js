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
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"

import dataConfig from "./dataConfig"
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
  let { taxPayerNo="", isSum="", transferType="", taxPayer=""} = filter

  // 通过配置字典渲染Select下拉框内容
  const {summaryStatusList,transferTypeList} = dataConfig
  const transferTypeListJSX = Object.keys(transferTypeList).map(key => <Option key={key} value={key}>{transferTypeList[key]}</Option>)
  const summaryStatusListJSX = Object.keys(summaryStatusList).map(key => <Option key={key} value={key}>{summaryStatusList[key]}</Option>)

  const handleFields = (fields) => {
    const { period } = fields
    if (period.length) {
      fields.period = [period[0].format('YYYY-MM-DD'),period[1].format('YYYY-MM-DD')];
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    const {taxPayer,...other} = fields
    onFilterChange(other)
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
          type: 'summaryTransfer/updateState',
          payload: {
            modalVisible: 'taxpayerBody'
          }
        })
      },
      onClear(){
        setFieldsValue({taxPayerNo : "", taxPayer:""})
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
  // 纳税主体
  const TaxpayerBodyModalProps = {
    onOk (data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel () {
      hideModal()
    },
  }

  const hideModal = ()=>{
    dispatch({
      type: "summaryTransfer/updateState",
      payload:{
        modalVisible:""
      }
    });
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
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
        <Row gutter={24}>
          <Col {...ColProps} id="createTimeRangePicker">
            <FormItem {...formItemLayout}  label="所属期间">
              {getFieldDecorator('period',{
                initialValue: initialCreateTime
              } )((<RangePicker
                getCalendarContainer={() => {
                  return document.getElementById('createTimeRangePicker')
                }}
              />))}
            </FormItem>
          </Col>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="编制单位">
              {< ModalInputSearch
                {...modalInputSearchProps({
                  name:'taxPayerNo',
                  initialDisplayValue:taxPayer,
                  initialValue:taxPayerNo,
                  displayName:'taxPayer'})} />}
            </FormItem>
          </Col>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="汇总状态">
              {getFieldDecorator('isSum', { initialValue: isSum })(<Select>
                <Option value="">请选择</Option>
                {summaryStatusListJSX}
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps} >
            <FormItem {...formItemLayout} label="传递单类型">
              {getFieldDecorator('transferType', { initialValue: transferType })(<Select>
                <Option value="">请选择</Option>
                {transferTypeListJSX}
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
      {modalVisible==='taxpayerBody'&&<TaxpayerBodyModal {...TaxpayerBodyModalProps} />}

    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
