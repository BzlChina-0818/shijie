import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Button} from 'antd'
import {DropOption, CustomTable} from 'components'

const {confirm} = Modal

const List = ({
                onDeleteItem, onEditItem, toDetail, location, ...tableProps
              }) => {


  const columns = [
    {
      title: '功能代码',
      dataIndex: 'functionCode',
      key: 'functionCode'
    },
    {
      title: '功能名称',
      dataIndex: 'functionName',
      key: 'functionName'
    },
    {
      title: '功能分类',
      dataIndex: 'functionType',
      key: 'functionType',
      render: text => {
          switch (text) {
            case 0:
              return (<span>按钮</span>)
              break;
            case 1:
              return (<span>其他</span>)
              break;

        }
      }
    },
    {
      title: '按钮分类',
      dataIndex: 'buttonType',
      key: 'buttonType',
      render: text => {
        switch (text) {
          case "SAVE":
            return (<span>新增</span>)
            break;
          case "UPDATE":
            return (<span>修改</span>)
            break;
          case "DETAIL":
            return (<span>详情</span>)
            break;
          case "DELETE":
            return (<span>删除</span>)
            break;
          case "IMPORT":
            return (<span>导入</span>)
            break;
          case "EXPORT":
            return (<span>导出</span>)
            break;
          case "OTHER":
            return (<span>其他</span>)
            break;
        }
      }
    }
    , {
      title: '是否显示',
      dataIndex: 'isShowName',
      key: 'isShowName',
      render: text => {
        switch (text) {
          case "否":
            return (<span>否</span>)
            break;
          case "是":
            return (<span>是</span>)
            break;
        }
      }
    },
    {
      title: '数据库表名',
      dataIndex: 'bizTable',
      key: 'bizTable',
    },
    {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (text, record) => {
        return (<div className="operation">
          <Button onClick={e => onEditItem(record, e)} size="small">修改</Button>
          <Button onClick={e => toDetail(record, e)} size="small">详情</Button>
        </div>)
      },
      fixed: 'right',
    },
  ]
  return (
    <CustomTable {...tableProps} columns={columns}/>

  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
