/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, Collapse } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
import BizCoaModal from "routes/baseModule/bizCoaModal"

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
  currentCoaTypeInput,
  taxTypeList,
  modalVisible,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  let { taxPayer="", taxPayerNo="", drSegCode="",drSeg, crSegCode,crSeg, taxNo=""} = filter
  const handleFields = (fields) => {
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

  const modalInputSearchProps = ({name,placeholder,initialValue,initialDisplayValue,displayName,modalType}) =>{
    return {
      onSearchModal(){
        dispatch({
          type: 'calculateAccruedCfg/updateState',
          payload:{
            modalVisible:modalType,
            currentCoaTypeInput:name,
          }

        })
      },
      onClear(){
        if(name==="taxPayerNo"){
          setFieldsValue({taxPayerNo : "", taxPayer:""})
        }else if(name==="drSegCode"){
          setFieldsValue({drSegCode : "", drSeg:""})
        }else if(name==="crSegCode"){
          setFieldsValue({crSegCode : "", crSeg:""})
        }
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
  const hideModal = ()=>{
    dispatch({
      type: "calculateAccruedCfg/updateState",
      payload:{
        modalVisible:""
      }
    });
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
  // 科目
  const BizCoaModalProps = {
    coaType:"04",
    onOk (data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      if(currentCoaTypeInput==="drSegCode"){
        formData.drSegCode = data.coaValue
        formData.drSeg = data.coaDesc
      }

      setFieldsValue(formData)
      hideModal()
    },
    onCancel () {
      hideModal()
    },
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
      <Row gutter={24}>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="纳税主体">
            {< ModalInputSearch
              {...modalInputSearchProps({
                name:'taxPayerNo',
                initialDisplayValue:taxPayer,
                initialValue:taxPayerNo,
                displayName:'taxPayer',
                modalType:'taxpayerBody'})} />}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="计提借方科目名称">
            {< ModalInputSearch
              {...modalInputSearchProps({
                name:'drSegCode',
                initialDisplayValue:drSeg,
                initialValue:drSegCode,
                displayName:'drSeg',
                modalType:'bizCoa',
                })} />}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="计提贷方科目名称">
            {< ModalInputSearch
              {...modalInputSearchProps({
                name:'crSegCode',
                initialDisplayValue:crSeg,
                initialValue:crSegCode,
                displayName:'crSeg',
                modalType:'bizCoa',
              })} />}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="税种">
              {getFieldDecorator('taxNo', { initialValue: taxNo })(<Select>
                <Option value="">请选择</Option>
                {taxTypeList.map(item=>(
                  <Option key={item.taxNo} value={item.taxNo}>{item.taxName}</Option>
                ))}
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
      {modalVisible==='bizCoa'&&<BizCoaModal {...BizCoaModalProps} />}
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
