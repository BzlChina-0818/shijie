import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'
const { confirm } = Modal

const List = ({
               onEditItem, onDetailItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
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
      title: '开票日期',
      dataIndex: 'issueDate',
      key: 'issueDate',
      width:150
    },{
      title: '销货单位名称',
      dataIndex: 'salesName',
      key: 'salesName',
      width:500,

    }, {
      title: '金额',
      dataIndex: 'amountWithoutTax',
      key: 'amountWithoutTax',
      width:100
    },{
      title: '税额',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
      width:100
    },{
      title: '价税合计',
      dataIndex: 'amount',
      key: 'amount',
      width:100
    },{
      title: '购货单位名称',
      dataIndex: 'purchaseName',
      key: 'purchaseName',
      width:400
    },
    {
      title: '发票状态',
      dataIndex: 'invoiceStatus',
      key: 'invoiceStatus',
      width:120,
      render:(text)=>{
        switch(text){
          case  "0":
            return <span>否</span>
          case  "1":
            return <span>是</span>
        }
      }
    },{
      title: '是否认证',
      dataIndex: 'authStatus',
      key: 'authStatus',
      width:100,
      render:(text)=>{
        switch(text){
          case  "0":
            return <span>否</span>
          case  "1":
            return <span>是</span>
        }
      }
    },{
      title: '获取时间',
      dataIndex: 'importDate',
      key: 'importDate',
      width:150,
      render: (text)=>{
       return  moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }
    },
    {
      title: '关联日期',
      dataIndex: 'registerDate',
      key: 'registerDate',
      width:120,
      render: (text)=>{
        return  moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }
    },
    {
      title: '关联人',
      dataIndex: 'registerUsername',
      key: 'registerUsername',
      width:120,
    },
    {
      title: '关联所属部门',
      dataIndex: 'registerGroupName',
      key: 'registerGroupName',
      width:200,
    },
    {
      title: '认证日期',
      dataIndex: 'authDate',
      key: 'authDate',
      width:200,
      render: (text)=>{
        return  moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      width: 168,
      render: (text,record) => {
        return(
          <div className="operation">
            <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
          </div>
        )
      },
      fixed: 'right',
    },
  ]

  return (
    <CustomTable {...tableProps} columns={columns} scroll={{ x: 2000}}/>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
