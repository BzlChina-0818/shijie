import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Pagination  } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import './List.less'

const { confirm } = Modal

const List = ({
                onDeleteItem, onEditItem, toDetail,location, ...tableProps
              }) => {
  //location.query = queryString.parse(location.search)
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    }else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }else if (e.key==='3'){
      toDetail(record)
    }
  }
  const columns = [
    {
      title: '打印池编号',
      dataIndex: 'printingCode',
      key: 'printingCode',
      width: 200,
    }, {
      title: '打印池名称',
      dataIndex: 'printingName',
      key: 'printingName',
    }, {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '未盘点可发票期限',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },{
      title: '可否手工开票',
      dataIndex: 'make',
      key: 'make',
      render: text => (<span>{text
        ? '是'
        : '否'}</span>),
    },
    {
      title: '发票打印员',
      dataIndex: 'InvoicePrinter',
      key: 'InvoicePrinter',
    },{
      title: '发票复核人',
      dataIndex: 'InvoiceReviewer',
      key: 'InvoiceReviewer',
    },
    {
      title: '发票打印池',
      dataIndex: 'InvoicePrintingPool',
      key: 'InvoicePrintingPool',
    },
    {
      title: '可否手工开票',
      dataIndex: 'identifying',
      key: 'identifying',
      render: text => (<span>{text
        ? '启用'
        : '未启用'}</span>),
    },{
      title: '开始使用日期',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '结束使用日期',
      dataIndex: 'endTime',
      key: 'endTime',
    }, {
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

        bordered
          scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        size='small'

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
