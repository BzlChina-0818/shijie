import React, { Fragment } from 'react';
import { Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { connect } from 'dva'
import { FilterItem, ModalInputSearch } from 'components'
import { unix2Locale } from 'utils'
import styles from './SwFilter.less'

const Option = Select.Option
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker

const formData={}

const SwFilter = ({ 
                  form:{
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    resetFields
                  },
                  dispatch,
                  statusWarning,
                  onRunScriptChange,
                  onModal,
                  onClearModal,
                }) => {
  const { onStreamlineFlag, formData } = statusWarning


  const callback = (key) => {
    console.log(key)
  }

  const handleFields = (fields) => {
    const { atteTime, bizType } = fields
    if (atteTime && atteTime.length) {
      fields.atteTime = [atteTime[0].format('YYYY-MM-DD HH:mm:ss'),atteTime[1].format('YYYY-MM-DD HH:mm:ss')];
    }
    if(bizType && bizType.length){
      fields.bizType = parseInt(bizType);
    }
    return fields
  }

  const onHandleSubmit = (onResetFields) => {
    let files = getFieldsValue();
    files = handleFields(files)
    Object.assign(files,formData)
    if(onResetFields === 'onResetFields'){
      files.salesName=''
      files.partnerName=''
      files.salesTaxPayerNo=''
    }
    onRunScriptChange(files)
  }

  const onResetFields = () => {
    resetFields();
    onHandleSubmit('onResetFields')
  }

  // 精简检查按钮
  const onStreamline = () => {
    dispatch({
      type:"statusWarning/onStreamline"
    })
  }

  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onModal(name)
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
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="发票状态跟踪" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="发票业务类型:">
                  {getFieldDecorator('bizType', {
                    initialValue: formData.bizType,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="1">非一点付费业务</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="销货单位名称:">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name:'salesName',
                    placeholder:'销货单位名称',
                    initialValue:formData.salesName})} />}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="发票批次:">
                {getFieldDecorator('invoiceBatch', {
                  initialValue: formData.invoiceBatch,
                })(<Input />)}
              </FilterItem>
            </Col>
          </Row>
          <Row gutter={28}>
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
              <FilterItem label="发票导入总账状态:">
                {getFieldDecorator('importLedgerStatus', {
                initialValue: formData.importLedgerStatus,
                })(<Input/>)}
              </FilterItem>
            </Col> 
          </Row>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="专用发票类型:">
                {getFieldDecorator('deductibleInvoiceType', {
                  initialValue: formData.deductibleInvoiceType,
                })(<Select
                  showSearch
                  optionFilterProp="children"
                >
                  <Option value="">请选择</Option>
                  <Option value="0">增值税专用发票</Option>
                  <Option value="1">增值税普通发票</Option>
                  <Option value="5">红字发票通知单</Option>
                  <Option value="6">机动车销售统一发票</Option>
                  <Option value="8">红字发票</Option>
                  <Option value="9">海关进口增值税专用缴款书</Option>
                  <Option value="10">农产品收购发票或者销售发票</Option>
                  <Option value="11">加计扣除农产品进项税额</Option>
                  <Option value="12">通行费发票</Option>
                  <Option value="13">其他</Option>
                </Select>)}
              </FilterItem>
            </Col>   
            <Col span={8}>
              <FilterItem label="发票流程环节:">
                {getFieldDecorator('processState', {
                initialValue: formData.processState,
                })(<Select
                  showSearch
                  optionFilterProp="children"
                >
                  <Option value="0">请选择</Option>
                  <Option value="rootDrafterActivity">登记中</Option>
                  <Option value="drafterActivity">登记中(退回)</Option>
                  <Option value="eTaxReceiveActivity">已登记未接收</Option>
                  <Option value="eTaxAttacheActivity">已接收未认证</Option>
                  <Option value="endActivity">已认证</Option>
                </Select>)}
              </FilterItem>
            </Col>     
          </Row>
          <Row gutter={28} className={onStreamlineFlag.flag ? styles.statusWarning : ''}>
            <Col span={8}>
              <FilterItem label="发票认证审核状态:">
                  {getFieldDecorator('authenticationStatus', {
                    initialValue: formData.authenticationStatus,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="0">未认证</Option>
                    <Option value="1">相符</Option>
                    <Option value="2">不相符</Option>
                    <Option value="3">失败</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="发票批状态:">
                  {getFieldDecorator('batchStatus', {
                    initialValue: formData.batchStatus,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="0">草稿</Option>
                    <Option value="1">已登记</Option>
                    <Option value="2">已确认</Option>
                    <Option value="3">已退回</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="认证人:">
                {getFieldDecorator('verifier', {
                  initialValue: formData.verifier,
                })(<Input/>)}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="购货单位名称:">
                {< ModalInputSearch
                    {...modalInputSearchProps({
                      name:'purchaseName',
                      placeholder:'购货单位名称',
                      initialValue:formData.purchaseName})} />}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="发票抵扣状态:">
                  {getFieldDecorator('deductibleStatus', {
                    initialValue: formData.deductibleStatus,
                  })(<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="0">未抵扣</Option>
                    <Option value="1">已计入ERP（进项税）</Option>
                    <Option value="2">已生成税基</Option>
                    <Option value="3">已生成计算表</Option>
                    <Option value="4">已生成申报表</Option>
                    <Option value="5">已抵扣和抵扣失败</Option>
                    <Option value="6">取消抵扣</Option>
                  </Select>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="录入人:">
                {getFieldDecorator('applyUserName', {
                  initialValue: formData.applyUserName,
                })(<Input/>)}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="发票认证日期:">
                {getFieldDecorator('atteTime', {
                    initialValue: formData.atteTime,
                })(<RangePicker />)}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="录入人部门:">
                {getFieldDecorator('groupName', {
                  initialValue: formData.groupName,
                })(<Input/>)}
              </FilterItem>
            </Col> 
            <Col span={8}>
              <FilterItem label="报账单编号:">
                {getFieldDecorator('salesTaxPayerNo', {
                  initialValue: formData.salesTaxPayerNo,
                })(<Input/>)}
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

export default connect(({ statusWarning }) => ({ statusWarning }))(Form.create()(SwFilter));

