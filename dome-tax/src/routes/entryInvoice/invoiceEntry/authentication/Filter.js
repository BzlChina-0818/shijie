import React, { Fragment } from 'react';
import { Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { FilterItem, ModalInputSearch } from 'components'
import { connect } from 'dva'
import styles from './Filter.less'

const Option = Select.Option
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker
const size = 'default'

const Filter = ({ 
    onRunScriptChange,
    form:{
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
      resetFields,
    },
    authentication,
    dispatch,
    onIsModule,
    onClearInputSearch,
  }) => {

  const {  modalTitle, modalVisible, formData } = authentication
  const handleFields = (fields) => {
    const { atteTime } = fields
    if (atteTime && atteTime.length) { 
      fields.atteTime = [atteTime[0].format('YYYY-MM-DD'),atteTime[1].format('YYYY-MM-DD')];
    }
    return fields
  }

  const onHandleSubmit = (onResetFields) => {
    let files = getFieldsValue();
    files = handleFields(files);
    Object.assign(files,formData)
    if(onResetFields === 'onResetFields'){
      files = {
        salesName:'',
        purchaseName:'',
        purchaseTaxPayerNo:'',
        salesTaxPayerNo:''
      };
    }
    onRunScriptChange(files)
  }

  const onResetFields = () => {
    dispatch({
      type:'authentication/InputSearch',
      payload:{
        salesName:'',
        purchaseName:'',
        purchaseTaxPayerNo:'',
        salesTaxPayerNo:''
      },
    })
    resetFields();
    onHandleSubmit('onResetFields')
  }

  const callback = (key) => {
    console.log(key)
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onIsModule(name);
      },
      onClear(){
        onClearInputSearch(name);
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
        <Panel header="税控认证导入查询" key="1">
        <Form className={styles.journalfRow}>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="认证人:">
                  {getFieldDecorator('verifier', {
                  initialValue: formData.validation,
                  })(<Input />)}
              </FilterItem>
            </Col>
            {/* <Col span={8}>
              <FilterItem label="是否归属地:">
                  {getFieldDecorator('isAttribution', {
                  initialValue: formData.isAttribution,
                  })(<Select
                    showSearch
                    placeholder="请选择"
                    optionFilterProp="children"
                  >
                    <Option value="no">否</Option>
                    <Option value="yes">是</Option>
                  </Select>)}
              </FilterItem>
            </Col> */}
            <Col span={8}>
              <FilterItem label="认证日期:">
                {getFieldDecorator('atteTime', {
                    initialValue: formData.atteTime,
                })(<RangePicker />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="匹配状态:">
                  {getFieldDecorator('invoiceMatchStatus', {
                    initialValue: formData.isMatch,
                  })(<Select
                    showSearch
                    placeholder="请选择"
                    optionFilterProp="children"
                  >
                    <Option value="0">匹配成功</Option>
                    <Option value="1">匹配不成功</Option>
                    <Option value="2">未匹配</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="发票代码:">
                  {getFieldDecorator('invoiceCode', {
                  initialValue: formData.invoiceCode,
                  })(<Input />)}
              </FilterItem>
            </Col>     
            <Col span={8}>
              <FilterItem label="发票号码:">
                  {getFieldDecorator('invoiceNum', {
                  initialValue: formData.invoiceNum,
                  })(<Input/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="销货单位名称:">
                { <ModalInputSearch
                  {...modalInputSearchProps({
                    name:'salesName',
                    placeholder:'销货单位名称',
                    initialValue:formData.salesName})} />}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="购票单位名称:">
                {< ModalInputSearch
                {...modalInputSearchProps({
                  name:'purchaseName',
                  placeholder:'购票单位名称',
                  initialValue:formData.purchaseName})} />}
              </FilterItem>
            </Col>   
            <Col span={8}>
              <FilterItem label="销货单位纳税识别号:">
                  {getFieldDecorator('salesTaxPayerNo', {
                  initialValue: formData.salesTaxPayerNo,
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

export default connect(({authentication}) => ({authentication}))(Form.create()(Filter));
