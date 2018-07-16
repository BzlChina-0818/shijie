import React from 'react'
import { Button } from 'antd'
import { DropOption, CustomTable } from 'components'

const SwList = ({
                  ...SwListProps,
                  onDetail
                }) => {
  
  const columns = [
    {
      title: '审核表编写',
      dataIndex: 'profsnlId',
      key: 'profsnlId',
    },
    {
      title: '申请人所属组织',
      dataIndex: 'applyCompName',
      key: 'applyCompName'
    },
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode'
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum'
    },
    {
      title: '申请人',
      dataIndex: 'applyUserName',
      key: 'applyUserName'
    },
    {
      title: '申请日期',
      dataIndex: 'applyTime',
      key: 'applyTime'
    },
    {
      title: '认证开始时间',
      dataIndex: 'authDate',
      key: 'authDate'
    },
    {
      title: '认证结束时间',
      dataIndex: 'authDate',
      key: 'authD'
    },
    {
      title: '认证状态',
      dataIndex: 'authenticationStatusName',
      key: 'authenticationStatusName'
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return <Button size='small'onClick={() => onDetail(record.formId)} >详情</Button>
      }
    },
  ];

  const listProps = {
    ...SwListProps,
    rowKey:(record) => record.applyTime
  }

  return (
    <CustomTable {...listProps} columns={columns} scroll={{ x: 1000 }}></CustomTable>
  )
}

export default SwList