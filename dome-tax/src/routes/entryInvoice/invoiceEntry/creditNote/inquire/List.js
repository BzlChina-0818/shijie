import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'
const { confirm } = Modal

const List = ({
                onDeleteItem,onEditItem, onDetailItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '蓝字发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
      width:200
    }, {
      title: '蓝字发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum',
      width:150
    },
    {
      title: '通知单编号',
      dataIndex: 'id',
      key: 'id',
      width:150
    },
    {
      title: '蓝字开票日期',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate',
      width:100,
      render:(text)=>{
        return moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }

    }, {
      title: '蓝字销货单位名称',
      dataIndex: 'salesDeptName',
      key: 'salesDeptName',
      width:300
    },{
      title: '蓝字金额',
      dataIndex: 'noTaxAmount',
      key: 'noTaxAmount',
      width:100
    },{
      title: '蓝字税额',
      dataIndex: 'tax',
      key: 'tax',
      width:100
    },{
      title: '蓝字价税金额',
      dataIndex: 'totalTax',
      key: 'totalTax',
      width:100
    },
    {
      title: '红字金额',
      dataIndex: 'applyNoTax',
      key: 'applyNoTax',
      width:120,
    },
    {
      title: '红字申请日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      width:100,
      render:(text)=>{
        return moment(text).format("YYYY-MM-DD")=="Invalid date"?"":moment(text).format("YYYY-MM-DD")
      }

    },
    {
      title: '红字申请状态',
      dataIndex: 'formStatus',
      key: 'formStatus',
      width:100,
      render: text => {
        switch (text){
          case 1:
            return <span>草稿</span>
            break;
          case 2:
            return <span>审批中</span>
            break;
          case 3:
            return <span>已审批</span>
            break;
          case 4:
            return <span>已退回</span>
            break;
          case 5:
            return <span>已撤回</span>
            break;
        }
      }},
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (record) => {
        return(
          record.formStatus=="1"?<div className="operation">
            <Button onClick={e=> onEditItem(record)} size="small">详情</Button>
            <Button onClick={e=>{
              confirm({
                title: '确定删除吗?',
                onOk () {
                  onDeleteItem(record,e)
                },
              })
            }} size="small">删除</Button>
          </div>:<div className="operation">
            <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
          </div>

        )
      },
      fixed: 'right',
    },
  ]

  return (
    <CustomTable {...tableProps} columns={columns} scroll={{ x: 2000 }}/>
  )
}

List.propTypes = {

  location: PropTypes.object,
}

export default List
