import React from 'react'
import { Button } from 'antd'
import { DropOption, CustomTable } from 'components'

const SwList = ({
                  ...SwListProps,
                  toDetails
                }) => {
  
  const columns = [
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNum',
      key: 'invoiceNum'
    },
    {
      title: '开票时间',
      dataIndex: 'makeInvoiceDate',
      key: 'makeInvoiceDate'
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime'
    },
    {
      title: '认证日期',
      dataIndex: 'affirmTime',
      key: 'affirmTime'
    },
    {
      title: '录入人',
      dataIndex: 'applyUserName',
      key: 'applyUserName'
    },
    {
      title: '录入人部门',
      dataIndex: 'groupName',
      key: 'groupName'
    },
    {
      title: '发票批状态',
      dataIndex: 'batchStatus',
      key: 'batchStatus',
      render: (text) => {
        switch(text){
          case 0:
            return <span>增值税专用发票</span>
          case 1:
            return <span>普票</span>
          case 5:
            return <span>红字发票通知单</span>
          case 6:
            return <span>机动车销售统一发票</span>
          case 8:
            return <span>红字发票</span>
        }
      }
    },
    {
      title: '发票认证审核状态',
      dataIndex: 'authenticationStatusDesc',
      key: 'authenticationStatusDesc'
    },
    {
      title: '发票导入ERP状态',
      dataIndex: 'importLedgerStatusDesc',
      key: 'importLedgerStatusDesc'
    },
    {
      title: '抵扣状态',
      dataIndex: 'deductibleStatusDesc',
      key: 'deductibleStatusDesc'
    },
    {
      title: '销货单位名称',
      dataIndex: 'salestName',
      key: 'salestName'
    },
    {
      title: '报账单编号',
      dataIndex: 'checkSheet ',
      key: 'checkSheet'
    },
    {
      title: '发票批编号',
      dataIndex: 'invoiceBatch',
      key: 'invoiceBatch'
    },
    {
      title: '购货单位名称',
      dataIndex: 'purchaseName',
      key: 'purchaseName'
    },
    {
      title: '销方纳税人识别号',
      dataIndex: 'salesTaxPayerNo',
      key: 'salesTaxPayerNo'
    },
    {
      title: '专用发票类型',
      dataIndex: 'deductibleInvoiceTypeDesc',
      key: 'deductibleInvoiceTypeDesc'
    },
    {
      title: '金额',
      dataIndex: 'noTaxAmount',
      key: 'noTaxAmount'
    },
    {
      title: '税额',
      dataIndex: 'tax',
      key: 'tax'
    },
    {
      title: '价税合计',
      dataIndex: 'totalTax',
      key: 'totalTax'
    },
    {
      title: '累计使用金额',
      dataIndex: 'useAmount',
      key: 'useAmount'
    },
    {
      title: '累计使用税额',
      dataIndex: 'useTax',
      key: 'useTax'
    },
    {
      title: '可用金额',
      dataIndex: 'usableAmount',
      key: 'usableAmount'
    },
    {
      title: '可用税额',
      dataIndex: 'usableTax',
      key: 'usableTax'
    },
    {
      title: '发票业务类型',
      dataIndex: 'bizType',
      key: 'bizType',
      render: (text) => {
        switch(text){
          case 1:
            return <span>非一点付费业务</span>
        }
       
      }
    },
    {
      title: '是否不动产进项税',
      dataIndex: 'isHouseduty',
      key: 'isHouseduty',
      render: (text, record) => {
        switch(text){
          case '0':
            return <span>是</span>
          case '1':
            return <span>否</span>
        }
      }
    },
    {
      title: '发票流程环节',
      dataIndex: 'processStateEn',
      key: 'processStateEn'
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return <Button size='small' onClick={() => toDetails(record)}>详情</Button>
      }
    },
  ];

  const listProps = {
    ...SwListProps,
    columns,
    simple:'simple',
    scroll:{ x: 3500 },
    rowKey:record => record.formId,
  }

  return (
    <CustomTable {...listProps} ></CustomTable>
  )
}

export default SwList