import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, onDetailItem, location, ...tableProps,rowSelection
}) => {
  const columns = [
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
      width:200
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum',
      width:200
    },
     {
      title: '开票日期',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate',
      width:150
    }, {
      title: '发票类型',
      dataIndex: 'invoiceTypeName',
      key: 'invoiceTypeName',
      width:150,
    },{
        title: '销货名称',
        dataIndex: 'salesName',
        key: 'salesName',
        width:400
    }, {
      title: '购货名称',
      dataIndex: 'purchaseName',
      key: 'purchaseName',
      width:300
    },{
      title: '金额',
      dataIndex: 'amountWithoutTax',
      key: 'amountWithoutTax',
      width:100
    },
    {
      title: '税额',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
      width:100
    },
    {
      title: '价税合计',
      dataIndex: 'amount',
      key: 'amount',
      width:100
    },
    {
      title: '认证、查验状态',
      dataIndex: 'authStatusName',
      key: 'authStatusName',
      width:100
    },
    {
      title: '操作',
      key: 'operation',
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
    <div>
      <CustomTable {...tableProps} rowSelection={rowSelection} columns={columns} />
      <Button>手机扫描</Button>
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
