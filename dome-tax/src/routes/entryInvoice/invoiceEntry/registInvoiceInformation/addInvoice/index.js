// 登记信息发票添加发票行模块
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History} from 'dva/router'
import { connect } from 'dva'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Table } from 'antd'
import {message} from "antd/lib/index";
import { Page,SelectModal} from 'components'
import queryString from 'query-string'
import { PATH } from "utils"
import AddInvoice1 from './addInvoice1.js'
import AddInvoice2 from './addInvoice2.js'
import AddInvoice3 from './addInvoice3.js'
import AddInvoice4 from './addInvoice4.js'
const path = PATH.ENTRY_INVOICE
const ButtonGroup = Button.Group;
const Option = Select.Option;
const AddInvoice = ({
  location, dispatch, addInvoice, loading,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => { 
  const{detailDatas,count,rates,formData,pageType,pathType,ruleTypes,recordKey}=addInvoice
  if(pageType==='update'){
    detailDatas.map(function(item,key,ary){
      item.ruleTypes=ruleTypes
      item.key=key
    })
  }
  const invoiceLineState=queryString.parse(location.search)
  const columns = [
    {
      title: pathType==='registInvoiceInformation'?'货物或应税劳务、服务名称':'商品名称',
      dataIndex: "productName",
      render: (text, record) => {
        return (
          <Input
            defaultValue={record.productName}
            onBlur={e => {
              record.productName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "税率",
      dataIndex: "rate",
      width:200,
      render: (text, record) => {
        return (
          <Select
            defaultValue={record.rate}
            // dropdownMatchSelectWidth={false}
            style={{width: "200px"}}
            placeholder="请选择"
            onChange={addInvoiceProps1.rateChange.bind(null, record)}
          >
            {rates&&rates.map(item => {
              return <Option key={item.fldValue}>{item.dispValue}</Option>;
            })}
          </Select>
        );
      }
    },
    {
      title: "类别",
      dataIndex: "ruleType",
      width:250,
      render: (text, record) => {
        return (
          <Select
            // dropdownMatchSelectWidth={false}
            style={{width: "250px"}}
            defaultValue={record.ruleType}
            placeholder="请选择"
            onChange={addInvoiceProps1.ruleTypeChange.bind(null, record)}
            // onFocus={e=>{
            //   if(pageType==='update'){
            //     if(record.rate){
            //     const ruleType='ruleType_'+Number(record.rate)/100
            //       dispatch({
            //         type:'addInvoice/getRuleType',
            //         payload:{
            //             dictId:ruleType
            //         }
            //       }).then(data=>{
            //         if(data.success&&data.code==1000){
            //           record.ruleTypes=data.data
            //           dispatch({
            //             type: "addInvoice/updateState",
            //           });
            //         }else{
            //           message.error('参数错误');
            //         }
            //       })
            //   }
            //   console.log(record)
            // }}}
          >
            {record.ruleTypes&&record.ruleTypes.map(item => {
              return <Option key={item.fldValue}>{item.dispValue}</Option>;
            })}
          </Select>
        );
      }
    },
    {
      title: "金额",
      dataIndex: "noTaxAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
             defaultValue={record.noTaxAmount}
             type="number"
             onBlur={e => {
              record.noTaxAmount=Number(e.target.value)
               console.log(record.rate)
               if(record.rate){
                  record.taxAmount=Number(e.target.value)*Number(record.rate)/100
                  record.sumAmount = Number(e.target.value)+Number(record.taxAmount);   
              } 
              dispatch({
                type: "addInvoice/updateState",
              }); 
            }}
          />
        );
      }
    },
    {
      title: "税额",
      dataIndex: "taxAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
              disabled
             value={record.taxAmount}
          />
        );
      }
    },
    {
      title: "总金额",
      dataIndex: "sumAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
           disabled
            value={record.sumAmount}
          />
        );
      }
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return detailDatas.length > 0 ? (
          <Button onClick={e => addInvoiceProps1.onDelete(record, e)}>删除</Button>
        ) : null;
      }
    }
  ];
  // const handleFields = (fields) => {
  //   const { makeInvoiceDate } = fields
  //   if (makeInvoiceDate&&makeInvoiceDate!=null) {
  //     fields.makeInvoiceDate = makeInvoiceDate.format('YYYY-MM-DD HH:mm:ss');
  //   }
  //   return fields
  // }
  const addInvoiceProps1={
    formData,
    invoiceLineState,
    pageType,
    detailDatas,
    onAddDetail(){
      const newData = {
        key: count,
        productCode:null,
        productName: "",
        noTaxAmount: "",
        taxAmount: "",
        sumAmount: "",
        rate: "",
        ruleType:"",
      }
      dispatch({
        type: "addInvoice/updateState",
        payload: {
          detailDatas: [...detailDatas, newData],
          count: count + 1,
          // ruleTypes:[]
        }
      });
    },
    onDelete(record,value){
      console.log(record)
      dispatch({
        type: "addInvoice/updateState",
        payload: {
          //删除当前项
          detailDatas: detailDatas.filter(item => item.key !== record.key), 
          count: count - 1,
        }
      });
    },
    rateChange(record,value){
      if(record&&value){
        record.rate=value
        //计算金额税率总额
        if(record.noTaxAmount!=''&&record.noTaxAmount!=null){
            record.taxAmount=Number(value)*Number(record.noTaxAmount)/100
            record.sumAmount = record.taxAmount+Number(record.noTaxAmount)
            dispatch({
              type: "addInvoice/updateState",
            });
        }
      }
      const ruleType='ruleType_'+Number(value)/100
      dispatch({
        type:'addInvoice/getRuleType',
        payload:{
            dictId:ruleType
        }
      }).then(data=>{
        if(data.success&&data.code==1000){
          record.ruleTypes=data.data
          dispatch({
            type: "addInvoice/updateState",
            payload:{
              recordKey:record.key
            }
          });
        }else{
          message.error('参数错误');
        }
      })
    },
    ruleTypeChange(record, value){
      record.ruleType=value
    },
    columns:columns,
    onSave(fields){
          const invoiceLineList = detailDatas.map(item=>{
            const {key,ruleTypes,...other} = item
            return other
          })
          const formId={formId:invoiceLineState.formId}
          const getBizData={
            invoiceBatch:invoiceLineState.invoiceBatch,
            ...fields,
            invInvoiceLineDetailOutVO:invoiceLineList
          }
          let method=''  
          if(pageType==='create'){
           var payload={//新增
              bizData:getBizData
            }
            method='新增'
          }else{
           var payload={///修改
              bizData:{
                ...getBizData,
                ...formId
              }  
            }
            method='修改'
          }
          dispatch({
            type:"addInvoice/saveInvoiceLine",
            payload,
          }).then(data => {
            if (data.success&&data.code===1000) {
              message.success(`${method}发票行成功`);
              history.go(-1)
            } else {
              message.error(data.message);
            }
        });
    },
    onBack(){
      history.go(-1)
    },
    onSaveAdd(){
      dispatch({
        type: "addInvoice/updateState",  
        payload: {
          detailDatas: [],
          count: 0
        }
      });
    }
  }
  const addInvoiceProps2={
    formData,
    invoiceLineState,
    pageType,
    ruleTypes,
    rates,
    onSave(fields){
          const formId={formId:invoiceLineState.formId}
          const getBizData={
            invoiceBatch:invoiceLineState.invoiceBatch,
            ...fields,
          }
          let method=''  
          if(pageType==='create'){
           var payload={//新增
              bizData:getBizData
            }
            method='新增'
          }else{
           var payload={///修改
              bizData:{
                ...getBizData,
                ...formId
              }  
            }
            method='修改'
          }
          dispatch({
            type:"addInvoice/saveInvoiceLine",
            payload,
          }).then(data => {
            if (data.success&&data.code===1000) {
              message.success(`${method}发票行成功`);
              history.go(-1)
            } else {
              message.error(data.message);
            }
        });
    },
    onBack(){
      history.go(-1)
    },
    rateChange(value){
      const ruleType='ruleType_'+Number(value)/100
      dispatch({
        type:'addInvoice/getRuleType',
        payload:{
            dictId:ruleType
        }
      })
    },
  }
  return (
    <Page inner> 
      {invoiceLineState.invoiceType==='01'&&pathType==='registInvoiceInformation'&&<AddInvoice1 {...addInvoiceProps1}/>}
      {invoiceLineState.invoiceType==='02'&&pathType==='registInvoiceInformation'&&<AddInvoice2 {...addInvoiceProps2}/>}
      {invoiceLineState.invoiceType!='01'&&invoiceLineState.invoiceType!='02'&&pathType==='registInvoiceInformation'&&<AddInvoice3 {...addInvoiceProps2}/>}
      {invoiceLineState.invoiceType=='06'||pathType==='registerTaxProof'&&<AddInvoice4 {...addInvoiceProps1}/>}
    </Page>
  )
}
AddInvoice.propTypes = {
  addInvoice: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({addInvoice,loading }) => ({ addInvoice,loading }))(Form.create()(AddInvoice))
