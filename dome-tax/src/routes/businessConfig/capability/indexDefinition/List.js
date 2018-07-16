import React from 'react'
import { connect } from 'dva'
import { Table, Button, Modal } from 'antd'
import { CustomTable } from 'components'
import { NavLink } from 'react-router-dom'

const Tables = ({ 
                  ...tableProps, 
                  onDelete, 
                  onEditItem, 
                  onDeploy,
                  onRowSelectionChange,
                  dispatch,
                }) => {
  const columns = [
    { title: '指标ID', dataIndex: 'indId', key: '2' },
    { title: '指标名称', dataIndex: 'indName', key: '3' },
    { title: '指标编号', dataIndex: 'indNo', key: '4' },
    { title: '级别', dataIndex: 'grade', key: '5' },
    { title: '指标分类', dataIndex: 'classes', key: '6' },
    { title: '指标类型', dataIndex: 'indType', key: '7' },
    { title: '指标计算类型', dataIndex: 'applyType', key: '8' },
    {
      title: '操作',
      key: 'operation',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="operation">
            <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
            <Button onClick={e=>onDeploy(record,e)} size="small">配置</Button>
            <Button onClick={e=>onDelete(record,e)} size="small">删除</Button>
          </div>
        )
      }
    },
  ];
  
  const listProps = {
    ...tableProps,
    columns,
    simple:'simple',
    rowKey:record => record.indId
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let IdsArr = [];
      selectedRows.forEach(value => {
        IdsArr.push(value.formId);
      })
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      //disabled: record.invoiceMat
      //disabled: record.invoiceMatchStatus !== 2, // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <CustomTable rowSelection={rowSelection} { ...listProps } scroll={{ x: 1200 }}/>
  )
}

export default connect(({houseTax})=> ({houseTax}))(Tables)