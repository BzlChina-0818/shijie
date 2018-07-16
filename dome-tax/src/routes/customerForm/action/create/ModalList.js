import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
const { confirm } = Modal

const ModalList = ({
                     onDeleteItem, onEditItem, location, ...tableProps
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
