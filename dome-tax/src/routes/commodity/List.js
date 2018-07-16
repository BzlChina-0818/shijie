import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除此数据吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'compNname',
      key: 'compNname',
      render: (text, record) => <Link to={`commodity/${record.id}`}>{text}</Link>,
    }, {
      title: '商品名称',
      dataIndex: 'commodityName',
      key: 'commodityName',
    }, {
      title: '商品代码',
      dataIndex: 'commodityCode',
      key: 'commodityCode',
    },{
      title: '税目',
      dataIndex: 'taxItemName',
      key: 'taxItemName',
    }, {
      title: '税率',
      dataIndex: 'rate',
      key: 'rate',
    },{
      title: '开始使用时间',
      dataIndex: 'startUseOfTime',
      key: 'startUseOfTime',
    },{
      title: '结束使用时间',
      dataIndex: 'endUseOfTime',
      key: 'endUseOfTime',
    },{
      title: '启用标识',
      dataIndex: 'isOpenName',
      key: 'isOpenName',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '详情' }]} />
      },
      fixed: 'right',
    },
  ]
  console.log(tableProps)
  return (
    <div className="content-list">
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        size="small"
        rowKey={record => record.id}
      />
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
