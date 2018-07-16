import React, { Fragment } from 'react';
import { Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { connect } from 'dva'
import { FilterItem, ModalInputSearch } from 'components'
import { unix2Locale } from 'utils'
import { BusinessType } from './dataConfig'
import styles from './Filter.less'

const Option = Select.Option
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker

const Filter = ({ 
                  form:{
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    resetFields
                  },
                  onSearchModal,
                  onClearModal,
                  formData,
                  onRunScriptChange
                }) => {

  const BusinessTypeJSX = Object.keys(BusinessType).map(key => <Option key={key} value={key}>{BusinessType[key]}</Option>)                
  const callback = (key) => {
    console.log(key)
  }

  const onHandleSubmit = () => {
    let files = getFieldsValue();
    onRunScriptChange(files)
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
    onClearModal('indNo');
    onHandleSubmit()
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onSearchModal(name);
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
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="指标查询" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="指标编号:">
                {< ModalInputSearch
                    {...modalInputSearchProps({
                      name:'indNo',
                      placeholder:'指标编号',
                      initialValue:formData.indNo})} />}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="指标类型:">
                {getFieldDecorator('indType', {
                  initialValue: formData.indType,
                  })(<Input />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="指标名称:">
              {getFieldDecorator('indName', { initialValue: formData.indName })(<Select>
                <Option value="">请选择</Option>
                {BusinessTypeJSX}
              </Select>)}
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

export default Form.create()(Filter)

