/**
 * @description（发票录入>代扣代缴税收缴款凭证>发票行明细）
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
  onDeleteItem,onInspection, onEditItem, onDetailItem,rowSelection,addInvoice,invoiceType,invoiceBatch,...invoiceLineProps
}) => {
  const columns = [
    {
      title: '系统税票号码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
      width:200
    }, {
      title: '发票日期',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate',
      width:250,
    },{
        title: '征收机关名称',
        dataIndex: 'taxDepartment',
        key: 'taxDepartment',
        width:200
      }, {
      title: '代扣代缴项目',
      dataIndex: 'withholdItem',
      key: 'withholdItem',
      width:100
    },{
      title: '计税金额或销售收入',
      dataIndex: 'tax',
      key: 'tax',
      width:120
    },
    {
        title: '实缴金额',
        dataIndex: 'noTaxAmount',
        key: 'noTaxAmount',
        width:100
    },
    {
      title: '操作',
      key: 'operation',
      width: 220,
      render: (text,record) => {
        //根据发票类型
            return(
              <div className="operation">
                  <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
                  <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button>
                  <Button onClick={e=>onEditItem(record,e)} size="small">复制</Button>
              </div> 
            )     
        },      
      fixed: 'right',
    },
  ]
  return (
      <div>
            <CustomTable {...invoiceLineProps} rowSelection={rowSelection} columns={columns} />
            <div style={{marginTop:'10px'}} className="op-btn-group">
                <Button onClick={addInvoice} className="margin-right">添加</Button>
            </div>
      </div>
    
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  invoiceLineProps:PropTypes.object,
}

export default List
