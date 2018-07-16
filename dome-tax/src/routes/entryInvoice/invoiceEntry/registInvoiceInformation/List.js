import React from 'react'
import PropTypes from 'prop-types'
import { Table,Button,Popconfirm} from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const List = ({
  pathType,onDeleteItem, onEditItem, location, ...tableProps,rowSelection
}) => {
  if(pathType==='registInvoiceInformation'){
    var columns = [
          {
            title: '发票批次',
            dataIndex: 'invoiceBatch',
            key: 'invoiceBatch',
            width:200
          }, {
            title: '申请日期',
            dataIndex: 'groupNo',
            key: 'groupNo',
            width:150
          }, {
            title: '发票类型',
            dataIndex: 'invoiceTypeName',
            key: 'invoiceTypeName',
            width:150,
          },{
              title: '销货单位',
              dataIndex: 'salesCompName',
              key: 'salesCompName',
              width:400
            }, {
            title: '购货单位',
            dataIndex: 'purchaseCompName',
            key: 'purchaseCompName',
            width:300
          },{
            title: '发票状态',
            dataIndex: 'batchStatusName',
            key: 'batchStatusName',
            width:100
          },
          {
            title: '操作',
            key: 'operation',
            width: 168,
            render: (text,record) => {
                return(
                  <div className="operation">
                      <Button onClick={e=>onEditItem(record,e)} size="small">详情</Button>
                      {/* <Button onClick={e=>onDeleteItem(record,e)} size="small">删除</Button> */}
                      <Popconfirm title="确定删除此数据吗?" onConfirm={() => onDeleteItem(record)}>
                        <Button size="small" >删除</Button>
                      </Popconfirm>
                  </div> 
                )     
            },     
            fixed: 'right',
          },
        ]
      }else if(pathType==='registerTaxProof'){
        var columns = [
          {
            title: '发票批次',
            dataIndex: 'formId',
            key: 'formId',
          }, {
            title: '申请日期',
            dataIndex: 'applyDate',
            key: 'applyDate',
          }, {
            title: '缴款单位',
            dataIndex: 'salesCompName',
            key: 'salesCompName',
          },{
            title: '购货单位',
            dataIndex: 'purchaseCompName',
            key: 'purchaseCompName',
            width:'150px',
          }, {
            title: '发票状态',
            dataIndex: 'batchStatus',
            key: 'batchStatus',
            width:'150px',
            render: (text, record)=>{
              if(text==1){
                return "有效"
              }else if(text==0){
                return "无效"
              }
            }
          },{
            title: '操作',
            key: 'operation',
            render: (text, record) => {
              return <div className="operation">
                  <Button onClick={e=>onEditItem(record)} size="small">详情</Button>
              </div>
            },
          },
        ]
      }
  return (
    <CustomTable {...tableProps} rowSelection={rowSelection} columns={columns} />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
