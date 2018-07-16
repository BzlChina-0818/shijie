import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const { confirm } = Modal

const List = ({
  onReceiveItem, onDetailItem, location, ...tableProps,rowSelection
}) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '审核表编号',
      dataIndex: 'formProcess.profsnlId',
      key: 'formProcess.profsnlId',
      width:220
    }, {
      title: '申请人',
      dataIndex: 'formProcess.applyUserRealname',
      key: 'formProcess.applyUserRealname',
      width:150,
    },{
      title: '期间',
      dataIndex: 'formProcess.period',
      key: 'formProcess.period',
      width:100
    },{
      title: '提交认证时间',
      dataIndex: 'formProcess.applyDate',
      key: 'formProcess.applyDate',
      width:150
    },
    {
      title: '录入方式',
      dataIndex: 'formProcess.autoInputType',
      key: 'formProcess.autoInputType',
      width:100
    },
    {
      title: '销方单位',
      dataIndex: 'formProcess.salesTaxPayer',
      key: 'formProcess.salesTaxPayer',
      width:250
    },
    {
      title: '购方单位',
      dataIndex: 'formProcess.purchaseTaxPayer',
      key: 'formProcess.purchaseTaxPayer',
      width:250
    },
    {
      title: '公司名称',
      dataIndex: 'formProcess.applyCompName',
      key: 'formProcess.applyCompName',
      width:200
    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (text,record) => {
          return(
            <div className="operation">
                <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
                <Button onClick={e=>onReceiveItem(record,e)} size="small">领取</Button>
            </div> 
          )     
      },     
      fixed: 'right',
    },
  ]
  return (
    <CustomTable {...tableProps} rowSelection={rowSelection} columns={columns} />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
