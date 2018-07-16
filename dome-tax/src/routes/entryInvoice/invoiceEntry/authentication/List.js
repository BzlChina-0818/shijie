import React from 'react'
import { Table, Button } from 'antd'
import { CustomTable } from 'components'
import { NavLink } from 'react-router-dom'

const Tables = ({ ...tableProps, toDetails, onRowSelectionChange }) => {

  const columns = [
    { title: '发票代码', dataIndex: 'invoiceCode', key: '1'},
    { title: '发票号码', dataIndex: 'invoiceNum', key: '2' },
    { title: '开票日期', dataIndex: 'makeInvoiceDate', key: '3' },
    { title: '金额', dataIndex: 'noTaxAmount', key: '4' },
    { title: '税额', dataIndex: 'tax', key: '5' },
    { title: '销方纳税识别号', dataIndex: 'salesTaxPayerNo', key: '6' },
    { title: '销货单位', dataIndex: 'salesName', key: '7' },
    { title: '购货单位', dataIndex: 'purchaseName', key: '8' },
    { title: '认证人', dataIndex: 'verifier', key: '9' },
    { title: '认证结果', dataIndex: 'authenticationStatus', key: '10' },
    { title: '认证日期', dataIndex: 'affirmTime', key: '11' },
    { title: '类别', dataIndex: 'type', key: '12' },
    { title: '税率', dataIndex: 'taxRate', key: '13' },
    { title: '匹配状态', dataIndex: 'invoiceMatchDesc', key: '14' },
    { title: '发票批号', dataIndex: 'invoiceBatch', key: '15' },
  ];
  
  const listProps = {
    ...tableProps,
    columns,
    simple:'simple',
    rowKey:record => record.invoiceCode
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let formIdArr = [];
      selectedRows.forEach(value => {
        formIdArr.push(value.formId);
      })
      onRowSelectionChange(formIdArr)
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.invoiceMatchStatus !== 2, // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <CustomTable rowSelection={rowSelection} { ...listProps } scroll={{ x: 2000 }}/>
  )
}

export default Tables