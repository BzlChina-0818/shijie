import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button,Modal,  } from 'antd'
const {confirm}=Modal
const List = ({
                onDetailItem, onDeleteItem, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '计算表编码',
      dataIndex: 'vatFormNo',
      key: 'vatFormNo',
      render(text) {
        return <span className="color-red">{text}</span>;
      }
    }, {
      title: '所属期间',
      dataIndex: 'period',
      key: 'period',
    }, {
      title: '表单类型',
      dataIndex: 'tableTypeName',
      key: 'tableTypeName',
    },  {
      title: '编报单位',
      dataIndex: 'taxPayer',
      key: 'taxPayer',
    },  {
      title: '销项税合计',
      dataIndex: 'issueTotalTaxAmt',
      key: 'issueTotalTaxAmt',
    },  {
      title: '进项税合计',
      dataIndex: 'acceptTotalTaxAmt',
      key: 'acceptTotalTaxAmt',
    },  {
      title: '预缴额合计',
      dataIndex: 'ptotalTaxAmt',
      key: 'ptotalTaxAmt',
    },
    {
      title: '汇总时间',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: '申报状态',
      dataIndex: 'reportedStr',
      key: 'reportedStr',
    },{
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onDetailItem(record)}>表单详情</Button>
          <Button onClick={e=>{
            confirm({
              title: '确定删除吗?',
              onOk () {
                onDeleteItem(record,e)
              },
            })
          }} size="small">删除</Button>
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
