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
                  taxTypeList,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  let { profsnlId="", deriveTable="", period="", applyCompId="", applyCompName="", applyDate="", taxNo=""} = filter
  const handleFields = (fields) => {
    const { period, applyDate } = fields
    if (period.length) {
      fields.period = [period[0].format('YYYY-MM-DD'),period[1].format('YYYY-MM-DD')];
    }
    if(applyDate){
      fields.applyDate = applyDate.format('YYYY-MM-DD')
    }
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
          type: 'myTodoList/updateState',
          payload:{
            modalVisible:""
          }
        })
      },
      onClear(){
        setFieldsValue({applyCompId : "", applyCompName:""})
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
      type: "myTodoList/updateState",
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
      formData.applyCompId = data.taxPayerNo
      formData.applyCompName = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel () {
      hideModal()
    },
  }

  let initialCreateTime = []
  if (period) {
    initialCreateTime[0] = moment(period[0])
    initialCreateTime[1] = moment(period[1])
  }
  let initialApplyDate = ""
  if(applyDate){
    initialApplyDate = moment(applyDate)
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="查询" key="1">
      <Row gutter={24}>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="审核表编号">
            {getFieldDecorator('profsnlId', { initialValue: profsnlId })(<Input />)}
          </FormItem>
        </Col>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="审核表类型">
              {getFieldDecorator('deriveTable', { initialValue: deriveTable })(<Select>
                  <Option value="">请选择</Option>
                  <Option value="1">启用</Option>
                  <Option value="0">未启用</Option>
              </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps} id="createTimeRangePicker">
          <FormItem {...formItemLayout} label="期间">
            {getFieldDecorator('period', { initialValue: initialCreateTime })((<RangePicker
              getCalendarContainer={() => {
                return document.getElementById('createTimeRangePicker')
              }}
            />))}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...ColProps} >
          <FormItem {...formItemLayout} label="公司名称">
            {< ModalInputSearch
              {...modalInputSearchProps({
                name:'applyCompId',
                initialDisplayValue:applyCompName,
                initialValue:applyCompId,
                displayName:'applyCompName'})} />}
          </FormItem>
        </Col>
        <Col {...ColProps} id="applyDatePicker">
          <FormItem {...formItemLayout} label="起草时间">
            {getFieldDecorator('applyDate', { initialValue: initialApplyDate })((<DatePicker
              getCalendarContainer={() => {
                return document.getElementById('applyDatePicker')
              }}
            />))}
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
      {modalVisible&&<TaxpayerBodyModal {...TaxpayerBodyModalProps} />}

    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
