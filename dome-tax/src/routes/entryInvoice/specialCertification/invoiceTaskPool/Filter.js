 /* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Collapse } from 'antd'
const { RangePicker,MonthPicker } = DatePicker
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
  span:8,
  style: {
    marginBottom: 16,
  },
}
const Filter = ({
  onFilterChange,
  dispatch,
  invoiceTaskPool,
  onSearch,
  onClear,
  onReset,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // console.log(registInvoiceInformation)
  const {formData} = invoiceTaskPool
  const handleFields = (fields) => {
    const { createTime,applyDate } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'),createTime[1].format('YYYY-MM-DD')]
    }
    if (applyDate && applyDate != null) {
      fields.applyDate = applyDate.format('YYYY-MM-DD ');
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    handleFields(fields,formData)
    // onFilterChange(fields)
  }
  const handleSubmit = () => {
    setFieldsValue(formData)
    let fields = getFieldsValue()
    console.log(fields)
    fields = handleFields(fields)
    Object.assign(fields,formData)
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
    onReset()
    onFilterChange(fields)
  }

  let initialCreateTime = []
  if (filter.createTime) {
    initialCreateTime[0] = moment.unix(filter.createTime[0])
  }
  if (filter.createTime) {
    initialCreateTime[1] = moment.unix(filter.createTime[1])
  }
  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onSearch(name)
      },
      onClear(){
        onClear();
      },
      options:{
        name,
        placeholder,
        initialValue,
        getFieldDecorator
      }
    }
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="我的任务池查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="审核表编号">
                {getFieldDecorator('profsnlId', { initialValue: '' })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="createTimeRangePicker">
            <FormItem {...formItemLayout} label="期间">
                {getFieldDecorator('createTime', { initialValue:initialCreateTime })((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('createTimeRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="公司名称">
              {< ModalInputSearch
                {...modalInputSearchProps({
                    name:'applyCompName',
                    placeholder:'公司名称',
                    initialValue:formData.applyCompName})} />}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票代码">
                {getFieldDecorator('invoiceCode', { initialValue: '' })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票号码">
                {getFieldDecorator('invoiceNum', { initialValue: '' })(<Input />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="录入方式">
                {getFieldDecorator('autoInputType', { initialValue: '' })(
                <Select  onChange={handleChange.bind(null, 'autoInputType')}>
                  <Option value="">请选择</Option>
                  <Option value="1">手动添加</Option>
                  <Option value="2">自动添加</Option>
                  <Option value="3">混合添加</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps}>
              <FormItem {...formItemLayout} label="提交认证池时间">
                {getFieldDecorator('applyDate')(<MonthPicker  />)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销货单位名称">
              {<ModalInputSearch
                {...modalInputSearchProps({
                    name:'salesTaxPayer',
                    placeholder:'销货单位名称',
                    initialValue:formData.salesTaxPayer})} />}
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
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

//export default Form.create()(Filter)
export default connect((state) => ({invoiceTaskPool: state.invoiceTaskPool}))(Form.create()(Filter));
