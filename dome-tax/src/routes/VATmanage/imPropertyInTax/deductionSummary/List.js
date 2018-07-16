import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
  onDetail, 
  onDeleteItem, 
  location, 
  ...tableProps
}) => {

  const columns = [
    {
      title: '生效期间',
      dataIndex: 'housedutyCode',
      key: '1',
    }, 
    {
      title: '纳税人识别号',
      dataIndex: 'groupName',
      key: '2',
    }, 
    {
      title: '纳税人名称',
      dataIndex: 'status',
      key: '3',
    },
    {
      title: '税金总额',
      dataIndex: 'status',
      key: '4',
    },
    {
      title: '本期可抵扣税额',
      dataIndex: 'status',
      key: '5',
    },
    {
      title: '本期不可抵扣税额',
      dataIndex: 'status',
      key: '6',
    },
    {
      title: '本期转入税额',
      dataIndex: 'status',
      key: '7',
    },
    {
      title: '本期转出税额',
      dataIndex: 'status',
      key: '8',
    },
    {
      title: '计提状态',
      dataIndex: 'status',
      key: '9',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onDetail(record)}>详情</Button>
          <Button size="small" >删除</Button>
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
