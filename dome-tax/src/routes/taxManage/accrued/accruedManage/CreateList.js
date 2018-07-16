import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'

const List = ({
    location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '所属期间',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, {
      title: '申报单位',
      dataIndex: 'groupName',
      key: 'groupName',
    }, {
      title: '税种',
      dataIndex: 'status',
      key: 'status1',
    },  {
      title: '表类型',
      dataIndex: 'status',
      key: 'status2',
    },  {
      title: '税金总额',
      dataIndex: 'status',
      key: 'status3',
    },  {
      title: '负责人',
      dataIndex: 'status',
      key: 'status4',
    },  {
      title: '审批完成时间',
      dataIndex: 'status',
      key: 'status5',
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
