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
      title: '计算表编码',
      dataIndex: 'profsnlId',
      key: 'profsnlId',
    }, {
      title: '所属期间',
      dataIndex: 'period',
      key: 'period',
    }, {
      title: '传递单类型',
      dataIndex: 'transferTypeStr',
      key: 'transferTypeStr',
    },  {
      title: '编报单位',
      dataIndex: 'taxPayer',
      key: 'taxPayer',
    },  {
      title: '本期应缴增值税',
      dataIndex: 'totalTaxAmount',
      key: 'totalTaxAmount',
    },  {
      title: '汇总状态',
      dataIndex: 'isSumStr',
      key: 'isSumStr',
    },  {
      title: '申报状态',
      dataIndex: 'reportedStr',
      key: 'reportedStr',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>修改</Button>
          <Button size="small" onClick={e=>onEditItem(record)}>汇总详情</Button>
          <Button size="small" onClick={e=>onDeleteItem(record)}>删除</Button>
        </div>
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        rowKey={record => record.vatFormId}
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
