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
      title: '当前导入状态',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, {
      title: '日记账头信息',
      dataIndex: 'groupName',
      key: 'groupName',
    }, {
      title: '公司名称',
      dataIndex: 'status',
      key: 'status1',
    },  {
      title: '计提金额',
      dataIndex: 'status',
      key: 'status2',
    },  {
      title: '经办人',
      dataIndex: 'status',
      key: 'status3',
    },  {
      title: '创建时间',
      dataIndex: 'status',
      key: 'status4',
    },  {
      title: '日记账来源',
      dataIndex: 'status',
      key: 'status5',
    },  {
      title: '审批状态',
      dataIndex: 'status',
      key: 'status6',
    }, {
      title: '往来状态',
      dataIndex: 'status',
      key: 'status7',
    },{
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>详情</Button>
          <Button size="small" onClick={() => onDeleteItem(record)}>删除</Button>
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
