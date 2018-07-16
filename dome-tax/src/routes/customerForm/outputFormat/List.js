import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button } from 'antd'
import { DropOption ,CustomTable} from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'
import dataConfig from "./dataConfig"
const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, onDetailItem, location, ...tableProps
}) => {
  const {outputTypeList,alignList} = dataConfig

  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '数据列代码',
      dataIndex: 'dataColCode',
      key: 'dataColCode',
      width:200
    }, {
      title: '数据列名称',
      dataIndex: 'dataColName',
      key: 'dataColName',
      width:150
    }, {
      title: '输出列别名',
      dataIndex: 'dataColnAme2',
      key: 'dataColnAme2',
      align:'left',
      width:150
    },{
      title: '输出类型',
      dataIndex: 'outputType',
      key: 'outputType',
      width:100,
      render:text=>{
        const newText = outputTypeList[text]||""
        return (<span>{newText}</span>)
      }

    }, {
      title: '格式掩码',
      dataIndex: 'formatMask',
      key: 'formatMask',
      width:100
    },{
      title: '输出长度',
      dataIndex: 'outputLength',
      key: 'outputLength',
      width:100
    },{
      title: '对齐方式',
      dataIndex: 'align',
      key: 'align',
      render:text=>{
        const newText = alignList[text]||""
        return (<span>{newText}</span>)
      },
      width:100
    },{
      title: '顺序',
      dataIndex: 'sort',
      key: 'sort',
      width:100
    },
    {
      title: '是否为主键',
      dataIndex: 'isPk',
      key: 'isPk',
      width:120,
      render: text => (<span>{text==1
        ? '是'
        : '否'}</span>),
    },{
      title: '是否启用',
      dataIndex: 'isValid',
      key: 'isValid',
      width:100,
      render: text => (<span>{text=='1'
        ? '是'
        : '否'}</span>),
    },{
      title: '最后更新时间',
      dataIndex: 'lastupdateTime',
      key: 'lastupdateTime',
      width:150,
      render: (text)=>{
        return moment(text).format("YYYY-MM-DD")
      }
    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (record) => {
          return(
            <div className="operation">
                <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
                <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
