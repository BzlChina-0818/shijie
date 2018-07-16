import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
                onDeleteItem, onEditItem, toDetail, location, ...tableProps
              }) => {
  //location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {

    if (e.key === '1') {
      onEditItem(record)
    }
    if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          onDeleteItem(record.pid)
        },
      })
    }
    if (e.key==='3'){
      toDetail(record)
    }
  }

  const columns = [
    {
      title:'发票类型',
      dataIndex:'oinvoiceType',
      key:'oinvoiceType'
    },
    {
      title:'发票代码',
      dataIndex:'oinvoiceCode',
      key:'oinvoiceCode'
    },
    {
      title: '类别名称',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title:'发票限额',
      dataIndex:'amtLimit',
      key:'amtLimit'
    },
     {
      title: '地区',
      dataIndex: 'invoiceLocation',
      key: 'invoiceLocation',
    },  {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption  onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' },{key:'3',name:'详情'}]} />)
      },
      fixed: 'right',
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (

    <div className="content-list">
      <Table
        {...tableProps}
       // className={classnames(styles.table)}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.pid}
      />
    </div>

  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
