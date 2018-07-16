/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'dva'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Icon, Select, Collapse} from 'antd'
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"

const {MonthPicker} = DatePicker
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
                  onFilterChange,
                  dispatch,
                  filter,
                  modalVisible,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const {period, oinvoiceCode, oinvoiceNum, purchaseTaxPayer, salesTaxPayerNo,} = filter
  const handleFields = (fields) => {
    const {period} = fields
    if (period) {
      fields.period = period.format('YYYY-MM')
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()

    fields[key] = values
    // handleFields(fields)
    onFilterChange(fields)

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

  const modalInputSearchProps = ({name, placeholder, initialValue, initialDisplayValue, displayName, modalType}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'salesInvoiceTax/updateState',
          payload: {
            modalVisible: modalType,
            currentCoaTypeInput: name,
          }

        })
      },
      onClear() {
        setFieldsValue({taxPayerNo: "", taxPayer: ""})
      },
      options: {
        name,
        placeholder,
        initialValue,
        initialDisplayValue,
        displayName,
        getFieldDecorator
      }
    }
  }
  const hideModal = () => {
    dispatch({
      type: "salesInvoiceTax/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  const TaxpayerBodyModalProps = {
    onOk(data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      formData.salesTaxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="销项发票税基查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="所属期间">
                {getFieldDecorator('period', {initialValue: period})(<MonthPicker/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="购货单位名称">
                {getFieldDecorator('purchaseTaxPayer', {initialValue: purchaseTaxPayer})(<Input/>)}
              </FormItem>
            </Col><Col {...ColProps} >
            <FormItem {...formItemLayout} label="发票代码">
              {getFieldDecorator('oinvoiceCode', {initialValue: oinvoiceCode})(<Input/>)}
            </FormItem>
          </Col><Col {...ColProps} >
            <FormItem {...formItemLayout} label="发票号码">
              {getFieldDecorator('oinvoiceNum', {initialValue: oinvoiceNum})(<Input/>)}
            </FormItem>
          </Col>

            <Col {...ColProps}>
              <FormItem {...formItemLayout} label="纳税主体名称">
                {<ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'salesTaxPayerNo',
                    placeholder: '纳税主体名称',
                    initialValue: salesTaxPayerNo,
                    initialDisplayValue: salesTaxPayerNo,
                    displayName:'taxPayer',
                    modalType:'taxpayerBody'
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
      {modalVisible === 'taxpayerBody' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default (Form.create()(Filter))
