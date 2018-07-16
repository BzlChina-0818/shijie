import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import {FilterItem,ModalInputSearch} from 'components'
import styles from './filter.less'
import {Form, DatePicker, Select, Row, Col, Input, Collapse, Button} from 'antd'

const { MonthPicker } = DatePicker
const Panel = Collapse.Panel;
const FormItem = Form.Item

const Filter = ({
                  houseTax,
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    resetFields,
                  },
                  onIsModal,
                  onClearModal,
                  dispatch,
                }) => {
  let { formData } = houseTax;
  
  const handleFields = (fields) => {
    const { period, startTimeTax } = fields
    
    if (period) {
      fields.period = period.format('YYYY-MM')
    }
    if (startTimeTax) {
      fields.startTimeTax = startTimeTax.format('YYYY-MM-DD')
    }
    return fields
  }

  const onHandleSubmit = (resetFields) => {
    let fields = getFieldsValue()
    fields = handleFields(fields);
    Object.assign(fields,formData)
    if(resetFields === 'resetFields'){
      fields.taxPayerNo = ''
    }
    onFilterChange(fields)
  }

  const onResetFields = () => {
    resetFields();
    onHandleSubmit('resetFields');
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onIsModal(name);
      },
      onClear(){
        onClearModal(name);
      },
      options:{
        name,
        placeholder,
        initialValue,
        dataSource,
        getFieldDecorator,
      }
    }
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="房产税查询" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="所属期间:">
                {getFieldDecorator('period', {
                  initialValue: formData.period
                })(<MonthPicker/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="公司名称:">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name:'taxPayerNo',
                    placeholder:'公司名称',
                    initialValue:formData.taxPayerNo})} />}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="资产编码:">
                {getFieldDecorator('assetNo', {
                  initialValue: formData.assetNo
                })(<Input />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="启用日期:">
                {getFieldDecorator('startTimeTax', {
                  initialValue: formData.startTimeTax,
                })(<DatePicker/>)}
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

export default connect(({houseTax}) => ({houseTax}))(Form.create()(Filter))
