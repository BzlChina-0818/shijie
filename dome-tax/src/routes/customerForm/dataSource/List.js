import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DropOption,CustomTable } from 'components'
import queryString from 'query-string'

const List = ({
   onEditItem, onDetailItem,onOperate, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onDetailItem(record)
    } else if (e.key === '2') {
      onEditItem(record)
    }else if(e.key === '3'){
      // todo 参数goScriptLog
      onOperate(record,"/parameter")
    }else if(e.key === '4'){
       onOperate(record,"/outputFormat")
    }else if(e.key === '5'){
      // todo 输出日志
       onOperate(record,"/outJournal")
    }else if(e.key === '6'){
      // todo 功能定义

      onOperate(record,"/action")
    }
  }

  const columns = [
    {
      title: '数据源代码',
      dataIndex: 'datasourceCode',
      key: 'datasourceCode',
      width:'150px',
    }, {
      title: '数据源名称',
      dataIndex: 'datasourceName',
      key: 'datasourceName',
      width:'150px',
    }, {
      title: '数据源对象描述',
      dataIndex: 'reportDescribe',
      key: 'reportDescribe',
      align:'left',
      width:'700px',
      render: (text)=>{
        return (<span className="SL2">{text}</span>)
      }
    },{
      title: '数据源分隔符',
      dataIndex: 'delimiter',
      key: 'delimiter',
      width:'150px',
    }, {
      title: '是否有效',
      dataIndex: 'isValid',
      key: 'isValid',
      width:'150px',
      render: (text, record)=>{
        if(text==1){
          return "有效"
        }else if(text==0){
          return "无效"
        }
      }
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width:'200px',
      render: (text)=>{
        return moment(text).format("YYYY-MM-DD")
      }
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={[{ key: '1', name: '详情' },
                             { key: '2', name: '修改' },
                             { key: '3', name: '参数逻辑' },
                             { key: '4', name: '输出格式' },
                             { key: '5', name: '脚本日志' },
                             { key: '6', name: '功能定义' },
                             ]} />
      },
    },
  ]

  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        // scroll={{x: 2000}}
        rowKey={record => record.id}
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
