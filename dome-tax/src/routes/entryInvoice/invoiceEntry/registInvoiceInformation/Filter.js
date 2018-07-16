 /* global document */
import React,{Fragments} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import { FilterItem, ModalInputSearch } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Collapse } from 'antd'
const { RangePicker } = DatePicker
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
  formData,
  onSearch,
  onClear,
  onReset,
  pathType,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  console.log(formData);
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'),createTime[1].format('YYYY-MM-DD')];
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    handleFields(fields)
  }
  const handleSubmit = () => {
    setFieldsValue(formData)
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
    onReset()
    onFilterChange(fields)
  }
  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onSearch(name)
      },
      onClear(){
        onClear(name)
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
        <Panel header={pathType==='registInvoiceInformation'?"登记信息发票查询":"登记代扣代缴税收缴款凭证查询"} key="1">
        {pathType==='registerTaxProof'&&
        <Form>
          <Row gutter={24}>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="缴款单位名称">
                  {< ModalInputSearch
                    {...modalInputSearchProps({
                      name: 'salesName',
                      placeholder: '缴款单位名称',
                      initialValue: formData.salesName
                    })} />}
                </FormItem>
              </Col>

              <Col {...ColProps} id="createTimeRangePicker">
                <FormItem {...formItemLayout} label="申请日期">
                  {getFieldDecorator('createTime', { initialValue: '' })((<RangePicker
                    getCalendarContainer={() => {
                      return document.getElementById('createTimeRangePicker')
                    }}
                  />))}
                </FormItem>
              </Col>
            </Row>
          <Row gutter={24}>
              <Col offset={16} span={8} className="button-col">
              <Button className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>
              </Col>
          </Row>
        </Form>}
        {pathType==='registInvoiceInformation'&&
        <Form>
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销货单位名称">
              {< ModalInputSearch
                {...modalInputSearchProps({
                    name:'salesName',
                    placeholder:'销货单位名称',
                    initialValue:formData.salesName})} />}
              </FormItem>
            </Col>

            <Col {...ColProps} id="createTimeRangePicker">
            <FormItem {...formItemLayout} label="申请日期">
                {getFieldDecorator('createTime', { initialValue:'' })((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('createTimeRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="购货单位名称">
              {<ModalInputSearch
                {...modalInputSearchProps({
                    name:'purchaseName',
                    placeholder:'购货单位名称',
                    initialValue:formData.purchaseName})} />}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票业务类型">
                {getFieldDecorator('bizType', { initialValue: '' })(
                <Select  onChange={handleChange.bind(null, 'bizType')}>
                  <Option value="">请选择</Option>
                  <Option value="1">非一点业务付费</Option>
                  {/* <Option value="0">否</Option> */}
                </Select>)}
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
          </Row>
          <Row gutter={24}>
              <Col offset={16} span={8} className="button-col">
              <Button className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>
              </Col>
          </Row>
          </Form>}
        </Panel>
      </Collapse>
    </div>
  )
}

Filter.propTypes = {
  formData: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
}

export default Form.create()(Filter)

