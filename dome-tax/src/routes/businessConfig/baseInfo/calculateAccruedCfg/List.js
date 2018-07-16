import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
    onEditItem, onDeleteItem, location,onDetailItem, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '纳税主体',
      dataIndex: 'taxPayer',
      key: 'taxPayer',
    }, {
      title: '税种',
      dataIndex: 'taxName',
      key: 'taxName',
    }, {
      title: '税目',
      dataIndex: 'itemName',
      key: 'itemName',
    }, {
      title: '表类型',
      dataIndex: 'formType',
      key: 'formType',
    },  {
      title: '税目类型',
      dataIndex: 'itemTypeName',
      key: 'itemTypeName',
    },  {
      title: '借方成本中心',
      dataIndex: 'drCostSeg',
      key: 'drCostSeg',
    },  {
      title: '借方专业代码',
      dataIndex: 'drBandSeg',
      key: 'drBandSeg',
    },  {
      title: '借方会计科目',
      dataIndex: 'drSeg',
      key: 'drSeg',
    },  {
      title: '贷方会计科目',
      dataIndex: 'crSeg',
      key: 'crSeg',
    },  {
      title: '支付借方科目',
      dataIndex: 'taxDrSeg',
      key: 'taxDrSeg',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onDetailItem(record)}>详情</Button>
          <Button size="small" onClick={e=>onEditItem(record)}>修改</Button>
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
