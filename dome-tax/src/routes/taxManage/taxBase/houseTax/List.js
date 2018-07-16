import React from 'react'
import { connect } from 'dva'
import { Table, Button, Modal } from 'antd'
import { CustomTable } from 'components'
import { NavLink } from 'react-router-dom'

const Tables = ({ 
                  ...tableProps, 
                  onDelete, 
                  onEditItem, 
                  onRowSelectionChange,
                  dispatch,
                }) => {
  const columns = [
    { title: '所属期间', dataIndex: 'period', key: '2' },
    { title: '房屋所属单位名称', dataIndex: 'groupName', key: '3' },
    { title: '资产编号', dataIndex: 'assetNo', key: '4' },
    { title: '房屋坐落', dataIndex: 'location', key: '5' },
    { title: '数量', dataIndex: 'area', key: '6' },
    { title: '房屋原值', dataIndex: 'initialAmt', key: '7' },
    {
      title: '操作',
      key: 'operation',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        let { groupName, taxPayer, taxPayerNo, assetNo, ...other } = record
        return (
          <div className="operation">
            <Button onClick={e=>onDelete(record,e)} size="small">删除</Button>
            <Button onClick={e=>onEditItem(other,e)} size="small">修改</Button>
          </div>
        )
      }
    },
  ];
  
  const listProps = {
    ...tableProps,
    columns,
    simple:'simple',
    rowKey:record => record.id
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let IdsArr = [];
      selectedRows.forEach(value => {
        IdsArr.push(value.id);
      })
      dispatch({
        type:"houseTax/updateState",
        payload:{
          IdsArr
        }
      })
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      //disabled: record.invoiceMatchStatus !== 2, // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <CustomTable rowSelection={rowSelection} { ...listProps } scroll={{ x: 1200 }}/>
  )
}

export default connect(({houseTax})=> ({houseTax}))(Tables)