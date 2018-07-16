/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'dva'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Icon, Select, Collapse} from 'antd'

import SalesUnitNameModal from 'routes/baseModule/salesUnitNameModal'

const {RangePicker} = DatePicker
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
  span: 8,
  style: {
    marginBottom: 16,
  },
}
const Filter = ({
                  modalVisible,
                  filterData,
                  onFilterChange,
                  dispatch,

                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const {salesName, invoiceCode,} = filterData
  const handleFields = (fields) => {
    const {createTime} = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    handleFields(fields)
  }
  const handleSubmit = () => {
    setFieldsValue(filterData)
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
    dispatch({
      type: 'inquire/updateState',
      payload: {filterData: {}}
    })
    onFilterChange(fields)
  }


  const modalInputSearchProps = ({name, placeholder, initialValue,}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'inquire/updateState',
          payload: {
            modalVisible: name,

          },
        })
      },
      onClear() {
        if (name === "salesDeptName") {
          filterData.salesDeptName = ''
          filterData.salesTaxPayerNo = ''
        }
        dispatch({
          type: 'inquire/updateState',
          payload: filterData
        })
      },
      options: {
        name,
        placeholder,
        initialValue,
        getFieldDecorator,

      }
    }
  }
  const hideModal = () => {
    dispatch({
      type: "inquire/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  const TaxpayerBodyModalProps = {
    onOk(data) {
      // 根据modal输入框类型，作不同的赋值
      if (modalVisible === 'salesDeptName') {
        filterData.salesDeptName = data.partnerName
        filterData.salesTaxPayerNo = data.taxCode
      }
      dispatch({
        type: 'inquire/selectSuccess',
        payload: filterData,
      })
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="红字发票申请单查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="红字发票申请单号">
                {getFieldDecorator('invoiceCode', {initialValue: invoiceCode})(<Input/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
              <FormItem {...formItemLayout} label="发票开票日期">
                {getFieldDecorator('createTime', {initialValue: ""})((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('createTimeRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>

            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销货单位名称">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'salesDeptName',
                    placeholder: '销货单位名称',
                    initialValue: filterData.salesDeptName,

                    getFieldDecorator,
                  })} />}
              </FormItem>
            </Col>
            <Col {...ColProps} style={{display:"none"}}>
              <FormItem {...formItemLayout} label="销货单位名称">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'salesTaxPayerNo',
                    getFieldDecorator,
                  })} />}
              </FormItem>
            </Col>
          </Row>


          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
              <Button className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>

            </Col>
          </Row>
        </Panel>
      </Collapse>
      {modalVisible === 'salesDeptName' && <SalesUnitNameModal {...TaxpayerBodyModalProps} />}
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default (Form.create()(Filter))
