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
      title: '查验申请编号',
      dataIndex: 'id',
      key: 'id',

    }, {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',

    }, {
      title: '发票号码',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',

    }, {
      title: '开票日期',
      dataIndex: 'invoicingTime',
      key: 'invoicingTime',

      render: (text) => {
        return moment(text).format("YYYY-MM-DD")
      }
    }, {
      title: '发票金额',
      dataIndex: 'invoiceAmount',
      key: 'invoiceAmount',

    }, {
      title: '校验码',
      dataIndex: 'checkCode',
      key: 'checkCode',

    }, {
      title: '申请日期',
      dataIndex: 'applyTime',
      key: 'applyTime',

      render: (text) => {
        return moment(text).format("YYYY-MM-DD")
      }
    }, {
      title: '查验状态',
      dataIndex: 'result',
      key: 'result',

      render: text => {
        if(text=="001"){
          return (<span>成功</span>)
        }else{
          return (<span>失败</span>)
        }
      }
    }, {
      title: '公司名称',
      dataIndex: 'salesCompName',
      key: 'salesCompName',

    },
    {
      title: '操作',
      key: 'operation',
     width:168,
      render: (record) => {
        return (
          <div className="operation">
            {record.result?<Button onClick={e => onDetailItem(record, e)} size="small" type="dashed" disabled>重新查验</Button>: <Button onClick={e => onDetailItem(record, e)} >重新查验</Button>}
            <Button onClick={e => onDetailItem(record, e)} size="small">详情</Button>
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
