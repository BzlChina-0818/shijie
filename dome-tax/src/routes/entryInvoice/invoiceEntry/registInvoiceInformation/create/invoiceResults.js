/**
 * @description（登记信息发票>发票批>发票行明细）
 * 
 * @author sunxianlu
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Upload,message } from 'antd'
import {CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
const { confirm } = Modal
const List = ({
  onImport, onDeleteItem,onInspection, onEditItem, onDetailItem,rowSelection,addInvoice,autoAddInvoice,invoiceType,invoiceBatch,...invoiceLineProps
}) => {
  
  //导入
  const formdata = new FormData();//创建FormData对象
  const props = {
    beforeUpload: (file) => {//上传前函数
      formdata.append('file',file) //上传前添加文件
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/iinv/line/import',//服务器地址
    showUploadList:false,
    data://传给后台参数
      {...formdata, //导入所需的文件
        invoiceBatch:invoiceBatch //导入所需参数
      },
    onChange(info) {
      if (info.file.status === 'done') {
        if(info.file.response.code===1000){//请求成功回调参数
          onImport()
          message.success(info.file.response.message);
        }else{
          message.error(info.file.response.message);
        }
      } else if (info.file.status === 'error') {
        message.error(`导入文件失败.`);
      }
    },
  };
  const columns = [
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
      width:200
    }, {
      title: '发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum',
      width:150
    }, {
      title: '发票日期',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate',
      width:250,
    },{
        title: '发票类型',
        dataIndex: 'invoiceTypeDesc',
        key: 'invoiceTypeDesc',
        width:200
      }, {
      title: '金额',
      dataIndex: 'noTaxAmount',
      key: 'noTaxAmount',
      width:100
    },{
      title: '税额',
      dataIndex: 'tax',
      key: 'tax',
      width:100
    },
    {
        title: '价税合计',
        dataIndex: 'totalTax',
        key: 'totalTax',
        width:100
    },
    {
        title: '认证/查验状态',
        dataIndex: 'authenticationStatusDesc',
        key: 'authenticationStatusDesc',
        width:150
    },
    {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
        width:200
    },
    {
      title: '操作',
      key: 'operation',
      width: 220,
      render: (text,record) => {
        //根据发票类型
        if(record.invoiceType=='02'&&record.authenticationStatus!=1){
            return(
              <div className="operation">
                  <Button onClick={e=>onInspection(record,e)} size="small">手工查验</Button>
                  <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button>
                  <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
              </div> 
            )     
        }else if(record.invoiceType=='02'&&record.authenticationStatus===1||record.invoiceType!='02'&&record.inputModel==='0'){
            return(
              <div className="operation">
                  <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
                  <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button>
                  <Button onClick={e=>onEditItem(record,e)} size="small">复制</Button>
              </div> 
            )     
        }else if(record.invoiceType!='02'&&record.inputModel==='1'){
            return(
              <div className="operation">
                  <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
                  <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button>
                  <Button onClick={e=>onEditItem(record,e)} size="small">复制</Button>
              </div> 
            )  
        }
        // return(
        //   <div className="operation">
        //       {record.invoiceType=='02'&&record.chayan==false&&<Button onClick={e=>onEditItem(record,e)} size="small">手工查验</Button>}
        //       <Button onClick={e=>onDetailItem(record,e)} size="small">修改</Button>
        //       {<Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>}
        //       <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button>
        //       {record.invoiceType==='0'&&<Button onClick={e=>onEditItem(record,e)} size="small">复制</Button>}
        //   </div> 
        // )     
      },     
      fixed: 'right',
    },
  ]
  return (
      <div style={{marginTop:'10px'}}>
            <CustomTable {...invoiceLineProps} rowSelection={rowSelection} columns={columns} />
            <div style={{marginTop:'10px'}} className="op-btn-group">
                {invoiceType==='01'&& <Upload {...props}><Button className="margin-right">导入</Button></Upload>}
                <Button onClick={addInvoice} className="margin-right">添加</Button>
                <Button onClick={autoAddInvoice} className="margin-right">自动添加</Button>
            </div>
      </div>
  //   <div className="detailTable">
  //   <div style={{marginTop:'10px'}} className="op-btn-group">
  //     {invoiceType==='01'&& <Upload {...props}><Button >导入</Button></Upload>}
  //     <Button onClick={addInvoice} >添加</Button>
  //     <Button onClick={autoAddInvoice} >自动添加</Button>
  //   </div>
  //   <Table {...invoiceLineProps} rowSelection={rowSelection} columns={columns} ></Table>
  // </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  invoiceLineProps:PropTypes.object,
}

export default List
