import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Button} from 'antd'
import {DropOption, CustomTable} from 'components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'

const {confirm} = Modal

const List = ({
                onDeleteItem, onEditItem, onDetailItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '计算表编号',
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
      title: '编织单位',
      dataIndex: 'taxPayer',
      key: 'taxPayer',

    }, {
      title: '计算表状态',
      dataIndex: 'formStatusName',
      key: 'formStatusName',

    }, {
      title: '是否计提',
      dataIndex: 'accruedChargeName',
      key: 'accruedChargeName',

    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (record) => {
        return (
          <div className="operation">
          <Button onClick={e => onDetailItem(record, e)} size="small">更新</Button>
            <Button onClick={e=>{
              confirm({
                title: '确定删除吗?',
                onOk () {
                  onDeleteItem(record,e)
                },
              })
            }} size="small">删除</Button>
          </div>
        )
      },
      fixed: 'right',
    },
  ]

  return (
    <CustomTable {...tableProps} columns={columns} />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
