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
      title: '不动产进项税配置编号',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, {
      title: '公司名称',
      dataIndex: 'groupName',
      key: 'groupName',
    }, {
      title: '启用状态',
      dataIndex: 'status',
      key: 'status',
      width:'150px',
      render: (text)=>{
        if(text==1){
          return "启用"
        }else if(text==0){
          return "未启用"
        }
      }
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onEditItem(record)}>修改</Button>
          <Button size="small" onClick={e=>onDeleteItem(record)}>删除</Button>
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
