/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Select, Collapse} from 'antd'

const {MonthPicker} = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"

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
                  currentCoaTypeInput,
                  taxTypeList,
                  formStatusList,
                  modalVisible,
                  dispatch,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  let {taxPayer = "", taxPayerNo = ""} = filter
  const handleFields = (fields) => {
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    const {taxPayer, ...others} = fields
    console.log(others)
    onFilterChange(others)
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
          type: 'declaration/updateState',
          payload: {
            modalVisible: modalType,
            currentCoaTypeInput: name,
          }

        })
      },
      onClear() {
        if (name === "taxPayerNo") {
          setFieldsValue({taxPayerNo: "", taxPayer: ""})
        }
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
  const hideModal = () => {
    dispatch({
      type: "declaration/updateState",
      payload: {
        modalVisible: ""
      }
    });
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

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="所属期间">
                {getFieldDecorator('period', {
                  initialValue: '',
                })(<MonthPicker/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="编制单位">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'taxPayerNo',
                    initialDisplayValue: taxPayer,
                    placeholder: '编制单位',
                    initialValue: taxPayerNo,
                    displayName: 'taxPayer',
                    modalType: 'taxpayerBody'
                  })} />}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="计算表状态">
                {getFieldDecorator('formStatus', {
                  initialValue: ""
                })(<Select>
                  {formStatusList.map(formStatus => <Option key={formStatus.id}>{formStatus.dispValue}</Option>)}
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="报表编号">
                {getFieldDecorator('profsnlId', {
                  initialValue: '',
                })(<Input/>)}
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
      {modalVisible === 'taxpayerBody' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
