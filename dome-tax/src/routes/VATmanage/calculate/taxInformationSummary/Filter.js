/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Select, Collapse} from 'antd'

const {MonthPicker} = DatePicker
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
  span: 8,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
                  onFilterChange,
                  filter,
                  modalVisible,
                  dispatch,
                  tableTypeList,
                  reportedList,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  let {groupNo = "", status = "", groupName = "",} = filter
  const handleFields = (fields) => {
    const {period,applyDate} = fields
    if (period) {
      fields.period = period.format('YYYY-MM')
    }
    if(applyDate){
      fields.applyDate = applyDate.format('YYYY-MM-DD')
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

  const modalInputSearchProps = ({name, placeholder, initialValue, initialDisplayValue, displayName}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'taxInformationSummary/updateState',
          payload: {
            modalVisible: 'taxpayerBody'
          }
        })
      },
      onClear() {
        setFieldsValue({groupNo: "", groupName: ""})
      },
      options: {
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
    onOk(data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }

  const hideModal = () => {
    dispatch({
      type: "taxInformationSummary/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }


  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="增值税纳税信息表汇总查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} id="createTimeRangePicker">
              <FormItem {...formItemLayout} label="所属期间">
                {getFieldDecorator('period', {
                  initialValue: '',
                })(<MonthPicker/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
              <FormItem {...formItemLayout} label="汇总日期">
                {getFieldDecorator('applyDate', {
                  initialValue: '',
                })(<DatePicker showTime format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="表单类型">
                {getFieldDecorator('tableType', {
                  initialValue: ""
                })(<Select>
                  {tableTypeList.map(tableType => <Option key={tableType.id}>{tableType.dispValue}</Option>)}
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="申报状态">
                {getFieldDecorator('reported', {
                  initialValue: ""
                })(<Select>
                  {reportedList.map(reported => <Option key={reported.id}>{reported.dispValue}</Option>)}
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
