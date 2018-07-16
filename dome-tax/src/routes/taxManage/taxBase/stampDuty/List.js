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
    { title: '公司名称', dataIndex: 'groupName', key: '3' },
    { title: '合同编号', dataIndex: 'contractNo', key: '4' },
    { title: '合同金额', dataIndex: 'contractAmt', key: '5' },
    { title: '印花税额', dataIndex: 'taxAmt', key: '6' },
    { 
      title: '是否为框架合同', 
      dataIndex: 'isFrame', 
      key: '7',
      render: (text, record) => text == 1 ? '是' : '否'
    },
    { 
      title: '纳税执行状态', 
      dataIndex: 'execTaxStatus', 
      key: '8',
      render:(text) => {
        switch(text){
          case '01':
            return '未生成计算表';
          case '02':
            return '已生成计算表';
          case '03':
            return '已生成申报表';
          case '04':
            return '已申报并已缴纳';
          case '05':
            return '已缴纳未计提';
        }
      }
    },
    { title: '来源', dataIndex: 'source', key: '9' },
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
        type:"stampDuty/updateState",
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

export default connect(({stampDuty})=> ({stampDuty}))(Tables)