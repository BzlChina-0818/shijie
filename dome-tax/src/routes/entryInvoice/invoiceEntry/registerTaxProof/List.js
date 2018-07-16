import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button } from 'antd'


const List = ({
   onDetailItem, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
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
            <Button onClick={e=>onDetailItem(record)} size="small">详情</Button>
        </div>
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        rowKey={record => record.id}
        columns={columns}
      />
    </div>

  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
