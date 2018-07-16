import React, { Fragment } from 'react';
import { Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { connect } from 'dva'
import { FilterItem, ModalInputSearch } from 'components'
import styles from './filter.less'

const Option = Select.Option
const Panel = Collapse.Panel;
const { MonthPicker } = DatePicker

const formData={}

const Filter = ({ 
                  form:{
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    resetFields
                  },
                  dispatch,
                  stampDuty,
                  onIsModal,
                  onRunScriptChange
                }) => {
  const { onStreamlineFlag, formData } = stampDuty

  const handleFields = (fields) => {
    const { period } = fields
    
    if (period) {
      fields.period = period.format('YYYY-MM')
    }
    return fields
  }

  const onHandleSubmit = (onResetFields) => {
    let files = getFieldsValue();
    files = handleFields(files)
    Object.assign(files,formData)
    onResetFields === 'onResetFields' &&  (files.groupName = '')
    onRunScriptChange(files)
  }

  const onResetFields = () => {
    resetFields();
    onHandleSubmit('onResetFields')
  }

  // 精简检查按钮
  const onStreamline = () => {
    dispatch({
      type:"stampDuty/onStreamline"
    })
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onIsModal(name)
      },
      onClear(){
        onClearModal(name)
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
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="印花税查询" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="所属区间:">
                  {getFieldDecorator('period', {
                    initialValue:formData.period
                  })(<MonthPicker placeholder="选择日期"/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="公司名称:">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name:'groupName',
                    placeholder:'',
                    initialValue:formData.groupName})} />}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="合同编号:">
                {< ModalInputSearch
                    {...modalInputSearchProps({
                      name:'contractNo',
                      placeholder:'',
                      initialValue:formData.contractNo})} />}
              </FilterItem>
            </Col>
          </Row>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="合同类型:">
              {getFieldDecorator('contractType', {
                  initialValue: formData.contractType,
                })(<Select
                  showSearch
                  optionFilterProp="children"
                >
                  <Option value="1">请选择</Option>
                  <Option value="2">加工承揽合同</Option>
                  <Option value="3">建设工程勘察设计合同</Option>
                  <Option value="4">建筑安装工程承包合同</Option>
                  <Option value="5">财产租赁合同</Option>
                  <Option value="6">货物运输合同</Option>
                  <Option value="7">仓库保管合同</Option>
                  <Option value="8">借款合同</Option>
                  <Option value="9">财产保险合同</Option>
                  <Option value="10">技术合同</Option>
                  <Option value="11">产权转移书据</Option>
                  <Option value="12">记载资金的营业账簿</Option>
                  <Option value="13">权利、许可证照</Option>
                  <Option value="14">非记载自己的英特账簿</Option>
                  <Option value="15">其他</Option>
                </Select>)}
              </FilterItem>
            </Col>
          </Row>
          <Row gutter={28} className={onStreamlineFlag.flag ? styles.stampDuty : ''}>
            <Col span={8}>
              <FilterItem label="是否为合同框架:">
                  {getFieldDecorator('isFrame', {
                    initialValue: formData.isFrame,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="对方单位名称:">
                {getFieldDecorator('vendorName', {
                  initialValue: formData.vendorName,
                })(<Input/>)}  
              </FilterItem>
            </Col>
            <Col span={8}>
              <Row className="tax">
                <Col span={5}>
                  <span className="label">
                    印花税额：
                  </span>
                </Col>
                <Col span={7}>
                  <FilterItem label="从:">
                    {getFieldDecorator('minTax', {
                      initialValue: formData.minTax,
                    })(
                      <Input className={styles.taxInput}/>
                    )}
                  </FilterItem>
                </Col>
                <Col span={7}>
                  <FilterItem label="到:">
                    {getFieldDecorator('maxTax', {
                      initialValue: formData.minTax,
                    })(
                      <Input className={styles.taxInput}/>
                    )}
                  </FilterItem>
                </Col>
              </Row>
            </Col> 
            <Col span={8}>
              <FilterItem label="纳税执行状态:">
                {getFieldDecorator('execTaxStatus', {
                    initialValue: formData.execTaxStatus,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="01">未生成计算表</Option>
                    <Option value="02">已生成计算表</Option>
                    <Option value="03">已申成申报表</Option>
                    <Option value="04">已申报并已缴纳</Option>
                    <Option value="05">已缴纳未计提</Option>
                  </Select>)}
              </FilterItem>
            </Col> 
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
                <Button onClick={onHandleSubmit} >查询</Button>
                <Button className={styles.ml30} onClick={onResetFields}>清空</Button>
                <Button className={styles.ml30} onClick={onStreamline}>{onStreamlineFlag.btnText}</Button>
            </Col>
          </Row>
        </Form>
        </Panel>
      </Collapse>
    </div>
  )
}

export default connect(({ stampDuty }) => ({ stampDuty }))(Form.create()(Filter));

