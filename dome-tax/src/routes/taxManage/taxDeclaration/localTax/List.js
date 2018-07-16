import React from 'react'
import PropTypes from 'prop-types'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'
import {  Button, Popconfirm  } from 'antd'
import {Modal} from "antd/lib/index";
const { confirm } = Modal
const List = ({
    onEditItem, onDeleteItem, location,onDetailItem, ...tableProps
}) => {
  location.query = queryString.parse(location.search)
  const formStatusList={
    '1':'起草',
    '2':'审批中',
    '3':'已审批',
  }
  const columns = [
    {
      title: '申报单编号',
      dataIndex: 'profsnlId',
      key: 'profsnlId',
      render(text) {
        return <span className="color-red">{text}</span>;
      }
    },
    {
      title: '所属期间',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '编报单位',
      dataIndex: 'taxPayer',
      key: 'taxPayer',
    }, {
      title: '税金总额',
      dataIndex: 'formType',
      key: 'formType',
    },  {
      title: '申报单状态',
      dataIndex: 'formStatus',
      key: 'formStatus',
      render: text =>{
        const newText = formStatusList[text]||""
        return (<span>{newText}</span>)
      }
    },  {
      title: '是否已支付',
      dataIndex: 'ispayed',
      key: 'ispayed',
      render: text => (<span>{text=='1'
      ? '是'
      : '否'}</span>),
    },{
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e=>onUpdateItem(record)}>更新</Button>
          <Button onClick={e=>{
            confirm({
              title: '确定删除吗?',
              onOk () {
                onDeleteItem(record,e)
              },
            })
          }} size="small">删除</Button>
        </div>
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        rowKey={record => record.formId}
        columns={columns}
      />
    </div>

  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
