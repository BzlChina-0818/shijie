import React from 'react'
import { Table, Button } from 'antd'
import { CustomTable } from 'components'
import { NavLink } from 'react-router-dom'

const Tables = ({ ...tableProps, toDetails }) => {

  const columns = [
    { title: '数据源码', dataIndex: 'createUser', key: '1', width: 150 },
    { title: '数据源名称', dataIndex: 'duration', key: '2', width: 150 },
    { title: '执行时间', dataIndex: 'endTime', key: '3', width: 150 },
    { title: '购方税号', dataIndex: 'errorCode', key: '4', width: 150 },
    { title: '税方名称', dataIndex: 'runScript', key: '5', width: 150 },
    { title: '发票净额', dataIndex: 'runStatus', key: '6', width: 150 },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <Button size='small' onClick={e => toDetails(record)}>详情</Button>
      }
    },
  ];
  const listProps = {
    ...tableProps,
    columns,
    simple:'simple',
    rowKey:record => record.id
  }

  return (
    <CustomTable { ...listProps }/>
  )
}

export default Tables