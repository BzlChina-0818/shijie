import React from 'react'
import moment from 'moment'
import {FilterItem,ModalInputSearch} from 'components'
import styles from './filter.less'
import {Form, DatePicker, Select, Row, Col, Input, Collapse, Button} from 'antd'

const { MonthPicker } = DatePicker
const Panel = Collapse.Panel;
const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {

  const formData = {}
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime) {
      fields.createTime = createTime.format('YYYY-MM-DD')
    }
    return fields
  }
  const onHandleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const callback = (key) => {
    console.log(key)
  }

  const onResetFields = () => {
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

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        
      },
      onClear(){
       
      },
      options:{
        name,
        placeholder,
        initialValue,
        dataSource,
        getFieldDecorator
      }
    }
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="房产税查询" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="所属期间:">
                {getFieldDecorator('period', {
                  initialValue: formData.respectivePeriod
                })(<MonthPicker/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="编制单位:">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name:'companyName',
                    placeholder:'编制单位',
                    initialValue:formData.companyName})} />}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="计算表状态:">
                {getFieldDecorator('isValid', { initialValue: formData.isValid })(
                  <Select>
                    <Option value="">请选择</Option>
                    <Option value="1">起草</Option>
                    <Option value="2">审批中</Option>
                    <Option value="3">已审批</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="报表编号:">
                {getFieldDecorator('assetNo', {
                  initialValue: formData.assetsEncoding
                })(<Input />)}
              </FilterItem>
            </Col>     
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
                <Button onClick={onHandleSubmit} >查询</Button>
                <Button className={styles.ml30} onClick={onResetFields}>清空</Button>
            </Col>
          </Row>
        </Form>
        </Panel>
      </Collapse>
    </div>
  )
}

Filter.propTypes = {}

export default Form.create()(Filter)
