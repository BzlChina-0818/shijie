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
      title: '审核表编号',
      dataIndex: 'formProcess.profsnlId',
      key: 'profsnlId',
    }, {
      title: '审核表类型',
      dataIndex: 'formProcess.deriveTable',
      key: 'deriveTable',
    }, {
      title: '税种',
      dataIndex: 'formProcess.taxName',
      key: 'taxName',
    }, {
      title: '申请人',
      dataIndex: 'formProcess.applyUserName',
      key: 'applyUserName',
    },
    // {
    //   title: '上一环节处理人',
    //   dataIndex: 'formProcess.processStepName',
    //   key: 'processStepName',
    // },
    {
      title: '当前环节',
      dataIndex: 'activityDefName',
      key: 'activityDefName',
    }, {
      title: '期间',
      dataIndex: 'formProcess.period',
      key: 'period',
    }, {
      title: '销方单位',
      dataIndex: 'formProcess.salesTaxPayer',
      key: 'salesTaxPayer',
    }, {
      title: '购方单位',
      dataIndex: 'formProcess.purchaseTaxPayer',
      key: 'purchaseTaxPayer',
    }, {
      title: '公司名称',
      dataIndex: 'formProcess.applyCompName',
      key: 'applyCompName',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>详情</Button>
          <Button size="small" onClick={() => onDeleteItem(record)}>回退</Button>
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
