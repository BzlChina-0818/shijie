import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
    onEditItem, onDeleteItem, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '生成期间',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, 
    {
      title: '生效期间',
      dataIndex: 'groupName',
      key: 'groupName',
    }, 
    {
      title: '认证期间',
      dataIndex: 'status',
      key: '1',
    }, 
    {
      title: '纳税人识别号',
      dataIndex: 'status',
      key: '2',
    }, 
    {
      title: '纳税人名称',
      dataIndex: 'status',
      key: '3',
    }, 
    {
      title: '发票代码',
      dataIndex: 'status',
      key: '4',
    }, 
    {
      title: '发票号码',
      dataIndex: 'status',
      key: '5',
    }, 
    {
      title: '税额',
      dataIndex: 'status',
      key: '6',
    }, 
    {
      title: '本期可抵扣税额',
      dataIndex: 'status',
      key: '7',
    }, 
    {
      title: '转入进项税额',
      dataIndex: 'status',
      key: '8',
    }, 
    {
      title: '抵扣状态',
      dataIndex: 'status',
      key: '9',
    }, 
    {
      title: '不动产进项税类型',
      dataIndex: 'status',
      key: '10',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>税额转出</Button>
          <Popconfirm title="确定转出?" onConfirm={() => onDeleteItem(record)}>
            <Button size="small" >转出</Button>
          </Popconfirm>
        </div>
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        //rowKey={record => record.id}
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
