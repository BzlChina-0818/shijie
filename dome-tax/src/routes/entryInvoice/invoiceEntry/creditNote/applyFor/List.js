import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'
const { confirm } = Modal

const List = ({
                onDeleteItem, onDetailItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',

    }, {
      title: '发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum',

    },{
      title: '开票日期',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate',

      render:(text)=>{
        return moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }

    }, {
      title: '蓝字销货单位名称',
      dataIndex: 'salesName',
      key: 'salesName',

    },{
      title: '不含税金额',
      dataIndex: 'noTaxAmount',
      key: 'noTaxAmount',

    },{
      title: '税额',
      dataIndex: 'tax',
      key: 'tax',

    },{
      title: '价税金额',
      dataIndex: 'totalTax',
      key: 'totalTax',

    },
    {
      title: '发票批状态',
      dataIndex: 'batchStatus',
      key: 'batchStatus',

      render: text => {
        switch (text){
          case 0:
            return <span>草稿</span>
            break;
          case 1:
            return <span>已登记</span>
            break;
          case 2:
            return <span>已确认</span>
            break;
          case 3:
            return <span>已退回</span>
            break;

        }

      }
    },
    {
      title: '发票认证审核状态',
      dataIndex: 'authenticationStatus',
      key: 'authenticationStatus',

      render: text => {
        switch (text){
          case 0:
            return <span>未认证</span>
            break;
          case 1:
            return <span>相符</span>
            break;
          case 2:
            return <span>不相符</span>
            break;
          case 3:
            return <span>失败</span>
            break;

        }

      }
    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (record) => {
        return(
          <div className="operation">
            <Button onClick={e=>onDetailItem(record,e)} size="small">红字发票申请</Button>
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

  location: PropTypes.object,
}

export default List
