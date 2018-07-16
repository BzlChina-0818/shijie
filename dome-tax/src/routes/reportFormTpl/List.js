import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
    onEditItem, onEditTpl, location, onGenerate, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '报表ID',
      dataIndex: 'formId',
      key: 'formId',
    }, {
      title: '报表名称',
      dataIndex: 'templateName',
      key: 'templateName',
    }, {
      title: '报表说明',
      dataIndex: 'templateDesc',
      key: 'templateDesc',
    }, {
      title: '报表类型',
      dataIndex: 'templateTypeName',
      key: 'templateTypeName',
    }, {
      title: '税种名称',
      dataIndex: 'taxName',
      key: 'taxName',
    }, {
      title: '适用组织',
      dataIndex: 'groupName',
      key: 'groupName',
    }, {
      title: '适用范围',
      dataIndex: 'scopeName',
      key: 'scopeName',
    }, {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },  {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },  {
      title: '启用状态',
      dataIndex: 'enableStatusName',
      key: 'enableStatusName',
    },  {
      title: '生效时间',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
    },  {
      title: '上传用户',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>修改</Button>
          <Button size="small" onClick={e=>onGenerate(record)}>生成</Button>
          <Button size="small" onClick={()=>onEditTpl(record)}>修改模版</Button>
        </div>
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        rowKey={record => record.formId}
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
