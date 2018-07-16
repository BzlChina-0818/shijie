import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import classnames from 'classnames'
import { connect } from 'dva'
import { UFormItem, ModalInputSearch,SelectModal } from "components"
import { PATH,formValidMsg } from "utils"
import Modal from '../Modal'
import InvoiceResults from './invoiceResults'
import TaxProofResults from './taxProofResults'
import queryString from 'query-string'
import TaxpayerBodyModal from 'routes/baseModule/taxpayerBodyModal'
import SalesUnitNameModal from 'routes/baseModule/salesUnitNameModal'
import ProcessApplyModal from "routes/baseModule/processApplyModal"
import { Form, Input, InputNumber, Radio,DatePicker,TimePicker,Icon,Collapse, Cascader,Button,Row,Col,Select,message } from 'antd'
const Option = Select.Option;
const Panel = Collapse.Panel;
const FormItem = Form.Item
const ButtonGroup = Button.Group;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: { 
    span: 16,
  },
}
const path = PATH.ENTRY_INVOICE
const Create=({
    location,
    dispatch, 
    registInvoiceInformationCreate,
    loading,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
  const {isSave,pageType,selectedRowKeys,invoiceType,formData,modalVisible,invoiceTypes,pathType,processModalVisible,workData}=registInvoiceInformationCreate
  const invoiceState=queryString.parse(location.search)
  const {formId,...others}=invoiceState
  let choiceItem={}
    // methods
    const handleRefresh = (newQuery) => {
      dispatch(routerRedux.replace({
        pathname,
        search: queryString.stringify({
          ...query,
          ...newQuery,
        }),
      }))
    }
    const modalProps = {
      onOk (data) {
        if(modalVisible==='purchaseTaxPayerNo'){
          formData.purchaseName=data.taxPayer
          formData.purchaseTaxPayerNo=data.taxPayerNo
        }else if(modalVisible==='salesNo'){
          formData.salesNo=data.partnerMdmCode
          formData.salesName=data.partnerName
          formData.salesTaxPayerNo=data.textCode
        }  
        dispatch({
          type: 'registInvoiceInformationCreate/selectSuccess',
          payload: formData,
        })
        dispatch({
          type: 'registInvoiceInformationCreate/hideModal',
        })
      },
      onCancel () {
        dispatch({
          type: 'registInvoiceInformationCreate/hideModal',
        })
      },
      getFieldDecorator,
    }
    let invoiceLineOutVO=[]
    if(formData&&formData.invoiceLineOutVO!=null){
      invoiceLineOutVO=formData.invoiceLineOutVO
    }
    //发票行
    const invoiceLineProps={
      invoiceType:invoiceState.invoiceType,
      invoiceBatch:invoiceState.invoiceBatch,
      dataSource:invoiceLineOutVO,
      onInspection(){
        dispatch({
          type: 'registInvoiceInformationCreate/inspection',
          payload: record.formId,
        })
      },
      onDeleteItem (record) {
        dispatch({
          type: 'registInvoiceInformationCreate/delete',
          payload: record.formId,
        })
        .then(() => {
          handleRefresh({
            page: (invoiceLineOutVO.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
      },
      onDetailItem(item){
        dispatch(routerRedux.push({
          pathname:'/VAT',
          search: queryString.stringify({
            formId:item.formId
          }),
        }))
      },
      onEditItem (item){
        const url=pathType==='registInvoiceInformation'?'registInvoiceInformation':'registerTaxProof'
        dispatch(routerRedux.push({
          pathname:path+`/${url}/addInvoice/update`,
          search: queryString.stringify({
            formId:item.formId,
            ...others
          }),
        }))
      },
      addInvoice (){
        const url=pathType==='registInvoiceInformation'?'registInvoiceInformation':'registerTaxProof'
        dispatch(routerRedux.push({
          pathname:path+`/${pathType}/addInvoice/create`,
          search: queryString.stringify({
            ...invoiceState
          }),
        }))
      },
      autoAddInvoice (){
        dispatch(routerRedux.push({
          pathname:path+'/registInvoiceInformation/autoAddInvoice',
          search: queryString.stringify({
            invoiceType:invoiceState.invoiceType,
            invoiceBatch:invoiceState.invoiceBatch
          }),
        }))
      }
    }
    const databaseName = "发票批"
    const onSave= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }
        // todo 默认值
        let defaultValue={
          formId:invoiceState.formId
        }
        let url = "",
            method = "",
            data={
              bizType:null,
              issuedInvoice:null,
              applyUserId:null,
              applyUserName:null,
              groupNo:null,
              groupName:null,
              applyUserTel:null,
              invoiceType:null,
              invoiceTypeName:null,
              salesNo:null,
              salesRole:null,
              salesName:null,
              salesTaxPayerNo:'1000000',
              purchaseTaxPayerNo:null, 
              purchaseName:null
            } 
        const {invoiceLineOutVO,applyDate,salesRoleName,issuedInvoiceName,...other}=formData
        const fields = getFieldsValue()
        if(pageType==="create"){
          data = {
            ...getFieldsValue(),
            salesTaxPayerNo:'1000000',
          }
          method = "新增"
        }else{
          data = {
            ...getFieldsValue(),
            ...other,
            ...defaultValue,
          }
          method = "修改"
        }
        dispatch({
          type: 'registInvoiceInformationCreate/save',
          payload:{bizData:data},
        }).then((data) =>{
          console.log(data)
            if(data.success&&data.code===1000){
              message.success(`${method}${databaseName}成功`);
              let processDate = data.data
              const workData = {
                "runtimeCmdVO": {
                  // "handlerId": processDate.applyUserId,
                  "handlerId": "2",
                  //"handlerName": processDate.applyUserName,
                  "handlerName": "张三",
                  "handlerDeptId": "3",
                  //"handlerDeptId": processDate.applyDeptId,
                  // "handlerDeptName": processDate.applyDeptName,
                  "handlerDeptName": "财务部",
                  "handlerCompId": "4",
                  // "handlerCompId": processDate.applyComId,
                  //"handlerCompName": processDate.applyComName,
                  "handlerCompName": "北京分公司",
                  // "handlerRoleId": processDate.applySecodDeptId,
                  "handlerRoleId": "0",
                  "handlerRoleName": "默认岗",
                  // "handlerRoleName": processDate.applySecodDeptName,
                  "tenantId": "100",
                  //  "tenantId": processDate.ttCode,
                  "processInstId": 690001,
                  "curTaskId": "690011",

                  "vars": {
                    "amount": 2000
                  }
                },
                "bizDataVO": {
                  "itemId": "010002",
                  profsnlId: "22",
                  deriveId: "22",
                  deriveTable: "12", 
                  taxPayerNo: processDate.taxPayerNo,
                  taxPayer: processDate.tax,
                  period: "2",
                  taxNo: "3",
                  taxName: "3",
                  type: "3",
                  totalTaxAmount: "1",
                  salesTaxPayer: processDate.salesDeptName,
                  salesTaxPayerNo: "3",
                  purchaseTaxPayer: "2",
                  purchaseTaxPayerNo: "2",
                },
              } 
              dispatch({
                type: "registInvoiceInformationCreate/updateState",
                payload: {
                  isSave: true,
                  workData: workData,
                }
              })   
            }else{
              message.error(data.message);
            }
          }
        )
      })
    }
    const onGoSend = () => {
      if (isSave) {
        dispatch({
          type: 'registInvoiceInformationCreate/showModal',
        })
      }
      else {
        message.error(`请先保存数据后再发送`);
      }
  
    }
    const processModalProps = {
      ...workData,
      onOk(data) {
        console.log(data);
      },
      onCancel() {
        dispatch({
          type: 'registInvoiceInformationCreate/hideModal',
        })
      },
    }
    const goBack=()=>{
      history.go(-1)
    }
    const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
      return {
        onSearchModal(){
          dispatch({
            type: 'registInvoiceInformationCreate/updateState',
            payload: {
              modalVisible:name
            },
          })
        },
        onClear(){
          if(name==='purchaseTaxPayerNo'){
            formData.purchaseName=undefined
            formData.purchaseTaxPayerNo=undefined
          }else if(name==='salesNo'){
            formData.salesNo=undefined
            formData.salesName=undefined
            formData.salesTaxPayerNo=undefined 
          }  
          dispatch({
            type: 'registInvoiceInformationCreate/updateState',
            payload: {
              formData:formData
            },
          })
        },
        options:{
          name,
          placeholder,
          initialValue,
          getFieldDecorator
        }
      }
    }
    
    //render
    return(
        <div className="form-pane detail-list">
            <div className="form-btn-group">
              <Button onClick={onSave}>保存</Button>
              {pageType==='update'&&invoiceState.invoiceType==='02' && <Button >确认</Button>}
              <Button onClick={onGoSend}>发送</Button>
              {pageType==='create' && <Button >打印</Button>}
              <Button>审批历史</Button>
            </div>
            <Collapse className="collapse mb10" defaultActiveKey={['1']} >
              <Panel header="基本信息" key="1">
            {/* <div className="form-content condition-filter" style={{marginBottom:'10px'}}> */}
                <Form>
                  <Row gutter={24}>
                    <Col span={8}>
                          <FormItem label="发票业务类型"  {...formItemLayout} >
                          {getFieldDecorator('bizType', {
                              initialValue: formData.bizType||'1',
                              
                          })(<Select disabled>
                            <Option value="1">非一点付费内容</Option>
                          </Select>)}
                          </FormItem>
                      </Col>
                      {pathType==='registInvoiceInformation' && <Col span={8}>
                      <FormItem label="是否代开发票"  {...formItemLayout}>
                      {getFieldDecorator('issuedInvoice', {
                          initialValue: formData.issuedInvoiceName||'0',
                      })(<Select>
                        <Option value="">请选择</Option>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                      </Select>)}
                      </FormItem>
                      </Col>}
                      <Col span={8}>
                          <FormItem label="发票批次"  {...formItemLayout}>
                          {getFieldDecorator('invoiceBatch', {
                              initialValue: formData.invoiceBatch||'11111111111111',
                          })(<Input disabled/>)}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                          <FormItem label="申请人"  {...formItemLayout}>
                          {getFieldDecorator('applyUserId', {
                              initialValue: formData.applyUserId||111,
                          })(<Input disabled/>)}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                          <FormItem label="申请时间"  {...formItemLayout}>
                          {getFieldDecorator('applyDate',{
                              initialValue: formData.applyDate||'2018-06-06 00:00:00',
                          })(<Input disabled/>)}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                          <FormItem label="所属组织机构"  {...formItemLayout}>
                          {getFieldDecorator('groupNo', {
                              initialValue: formData.groupNo||'佛山',
                          })(<Input disabled/>)}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                          <FormItem label="联系电话"  {...formItemLayout}>
                          {getFieldDecorator('applyUserTel', {
                              initialValue: formData.applyUserTel||'134666111111',
                          })(<Input disabled/>)}
                          {/* <span className="ant-form-text">134666111111</span> */}
                          </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem label="发票类型" hasFeedback  {...formItemLayout}>
                            {getFieldDecorator('invoiceType', {
                              initialValue:formData.invoiceType,
                              rules: [
                                {
                                  required: true,
                                  message:"发票类型不能为空"
                                },
                              ],
                            })(<Select disabled={pathType==='registerTaxProof'||pageType=='update'} placeholder='请选择'>
                              <Option value="">请选择</Option>
                              {invoiceTypes&&invoiceTypes.map(item => {
                                return <Option key={item.fldValue}>{item.dispValue}</Option>;
                              })}
                            </Select>)}
                          </FormItem>
                      </Col>
                    <Col span={8}>
                        <FormItem label={pathType==='registInvoiceInformation'?"销货单位编码":"缴款单位编码"} hasFeedback {...formItemLayout} >
                        {<ModalInputSearch 
                        {...modalInputSearchProps({
                            name:'salesNo',
                            placeholder:'销货单位编码',
                            initialValue:formData.salesNo})} />}
                        </FormItem>
                    </Col> 
                    <Col span={8}>
                      <FormItem label="销货单位角色及对应系统" hasFeedback  {...formItemLayout}>
                        {getFieldDecorator('salesRole', {
                          initialValue: formData.invoiceType||'1',
                          rules: [
                            {
                              required: true,
                              message:"销货单位角色及对应系统不能为空"
                            },
                          ],
                        })(<Select>
                          <Option value="">请选择</Option>
                          <Option value="1">供应商(报账系统)</Option>
                          <Option value="2">F</Option>
                        </Select>)}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={pathType==='registInvoiceInformation'?"销货单位名称":"缴款单位名称"} hasFeedback {...formItemLayout}>
                          {getFieldDecorator('salesName', {
                            initialValue: formData.salesName,
                            rules: [
                              {
                                required: true,
                                message:"销货单位名称不能为空"
                              },
                            ],
                          })(<Input disabled/>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={pathType==='registInvoiceInformation'?"销货单位纳税人识别号":"缴款单位纳税人识别号"} hasFeedback {...formItemLayout}>
                          {getFieldDecorator('salesTaxPayerNo', {
                            initialValue: formData.salesTaxPayerNo,
                          })(<Input disabled/>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={pathType==='registInvoiceInformation'?"购货单位纳税人识别号":"纳税人识别号"} hasFeedback {...formItemLayout} >
                        {<ModalInputSearch
                        {...modalInputSearchProps({
                            name:'purchaseTaxPayerNo',
                            // placeholder:'购货单位纳税人识别号',
                            initialValue:formData.purchaseTaxPayerNo})} />}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={pathType==='registInvoiceInformation'?"购货单位名称":"纳税人名称"} hasFeedback {...formItemLayout}>
                          {getFieldDecorator('purchaseName', {
                            initialValue: formData.purchaseName,
                          })(<Input disabled/>)}
                        </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Panel>
            </Collapse>
            {/* </div> */}
            {pathType==='registInvoiceInformation'&&pageType==='update'&&<InvoiceResults {...invoiceLineProps}/>}
            {pathType==='registerTaxProof'&&pageType==='update' &&<TaxProofResults {...invoiceLineProps}/>}
            {/* {isSave && <InvoiceResults {...invoiceLineProps}/>} */}
            {modalVisible==='purchaseTaxPayerNo' && <TaxpayerBodyModal  {...modalProps} />}
            {modalVisible==='salesNo' && <SalesUnitNameModal {...modalProps} />}
            {processModalVisible && <ProcessApplyModal {...processModalProps} />}
        </div>
    )
}
Create.propTypes = {
  // optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  registInvoiceInformationCreate:PropTypes.object
}
export default connect(({ registInvoiceInformationCreate, loading }) => ({ registInvoiceInformationCreate, loading })) (Form.create()(Create))

