import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Button,Radio} from 'antd'
import {DropOption, CustomTable} from 'components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'
const RadioGroup = Radio.Group;
const {confirm} = Modal

const List = ({
                onDeleteItem, onDetailItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '所属期间',
      dataIndex: 'period',
      key: 'period',
      width: 100
    }, {
      title: '开票日期',
      dataIndex: 'printTimeStr',
      key: 'printTimeStr',
      width: 100,
    }, {
      title: '发票代码',
      dataIndex: 'oinvoiceCode',
      key: 'oinvoiceCode',
      width: 100,
    }, {
      title: '发票号码',
      dataIndex: 'oinvoiceNum',
      key: 'oinvoiceNum',
      width: 100
    }, {
      title: '购货单位名称',
      dataIndex: 'purchaseTaxPayer',
      key: 'purchaseTaxPayer',
      width: 200
    },{
      title: '购货单位纳税人识别号',
      dataIndex: 'purchaseTaxPayerNo',
      key: 'purchaseTaxPayerNo',
      width: 200
    },{
      title: '发票金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100
    },{
      title: '发票税额',
      dataIndex: 'tax',
      key: 'tax',
      width: 100
    },{
      title: '发票价税合计',
      dataIndex: 'smallTotalTax',
      key: 'smallTotalTax',
      width: 100
    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (record) => {
        return (
          <div className="operation">
          <Button onClick={e => onDetailItem(record, e)} size="small">浏览</Button>
          </div>
        )
      },
      fixed: 'right',
    },
  ]

  return (
    <CustomTable {...tableProps} columns={columns} scroll={{x: 2000}}/>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
