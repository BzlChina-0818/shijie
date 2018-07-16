import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DropOption } from 'components'
import queryString from 'query-string'

const ModalList = ({
  ...ModalListProps
}) => {
  return (
    <div className="content-list">
      <Table
      {...ModalListProps}
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
  ModalListProps: PropTypes.object,
}

export default ModalList;
