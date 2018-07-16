import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import {DropOption,CustomTable} from 'components'
import queryString from "query-string";
import moment from 'moment'
const List = ({
                 onEditItem, toDetail, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '参数代码',
      dataIndex: 'parameterCode',
      key: 'parameterCode'
    },
    {
      title: '参数名称',
      dataIndex: 'parameterName',
      key: 'parameterName'
    },
    {
      title: '参数类型',
      dataIndex: 'parameterType',
      key: 'parameterType',
      render: text => {
        switch (text) {
          case '1':
            return (<span>数字</span>)
            break;
          case '2':
            return (<span>字符</span>)
            break;
          case '3':
            return (<span>日期</span>)
            break;

        }
      }
    },
    {
      title: '顺序',
      dataIndex: 'parameterSort',
      key: 'parameterSort',
    },
    {
      title: '是否必填',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: text => {
        switch (text) {
          case '0':
            return (<span>否</span>)
            break;
          case '1':
            return (<span>是</span>)
            break;
        }
      }
    }, {
      title: '是否显示',
      dataIndex: 'isShow',
      key: 'isShow',
      render: text => {
        switch (text) {
          case '0':
            return (<span>否</span>)
            break;
          case '1':
            return (<span>是</span>)
            break;
        }
      }
    },
    {
      title: '参数录入方式',
      dataIndex: 'inputMode',
      key: 'inputMode',
      render: text => {
        switch (text) {
          case '1':
            return (<span>手工录入</span>)
            break;
          case '2':
            return (<span>下拉列表</span>)
            break;
          case '3':
            return (<span>下拉列表(多选)</span>)
            break;
          case '4':
            return (<span>列表选择</span>)
            break;
          case '5':
            return (<span>列表选择(多选)</span>)
            break;
          case '6':
            return (<span>日期(弹出框)</span>)
            break;case '7':
            return (<span>期间(弹出框)</span>)
            break;
        }
      }
    },
    {
      title: '参数对应的值集',
      dataIndex: 'valueset',
      key: 'valueset',
    },
    {
      title: '参数使用方式',
      dataIndex: 'usageMode',
      key: 'usageMode',
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text)=>{
        if(moment(text).format("YYYY-MM-DD")=="Invalid date"){
          return ""
        }
        return moment(text).format("YYYY-MM-DD")
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text)=>{
        if(moment(text).format("YYYY-MM-DD")=="Invalid date"){
          return ""
        }
        return moment(text).format("YYYY-MM-DD")
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 168,
      render: (text, record) => {
        return (  <div className="operation">
          <Button onClick={e=>onEditItem(record,e)} size="small">修改</Button>
          <Button onClick={e=>toDetail(record,e)} size="small">详情</Button>
        </div> )
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
