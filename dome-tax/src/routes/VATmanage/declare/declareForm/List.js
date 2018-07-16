import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
  location, 
  ...tableProps,
  onDelete,
  onUpdate
}) => {

  const columns = [
    {
      title: '申报表编号',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, 
    {
      title: '所属期间',
      dataIndex: 'groupName',
      key: 'groupName',
    }, 
    {
      title: '编报单位',
      dataIndex: 'status',
      key: '1',
    }, 
    {
      title: '税金总额',
      dataIndex: 'status',
      key: '2',
    }, 
    {
      title: '申报表状态',
      dataIndex: 'status',
      key: '3',
    }, 
    {
      title: '汇总状态',
      dataIndex: 'status',
      key: '4',
    }, 
    {
      title: '是否已支付',
      dataIndex: 'status',
      key: '5',
    }, 
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onUpdate(record)}>更新</Button>
          <Button size="small" onClick={e=>onDelete(record)}>删除</Button>
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

export default List
