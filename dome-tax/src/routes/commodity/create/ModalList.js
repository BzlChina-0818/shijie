import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DropOption } from 'components'
import queryString from 'query-string'

const ModalList = ({
   location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  return (
    <div className="content-list">
      <Table
      {...tableProps}
      bordered
      // scroll={{ x: 1250 }}
      simple
      size="small"
      rowKey={record => record.id}
    />
    </div>

  )
}

ModalList.propTypes = {
  location: PropTypes.object,
}

export default ModalList;
