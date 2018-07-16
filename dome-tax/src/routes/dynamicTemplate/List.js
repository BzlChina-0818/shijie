import React from 'react'
import PropTypes from 'prop-types'
import Lodash from 'lodash'
import { Modal, Button } from 'antd'
import {DropOption, CustomTable} from 'components'
import queryString from 'query-string'
import moment from 'moment'
const {confirm} = Modal

const List = ({
                onDeleteItem, onEditItem, onDetailItem, location, listConfig, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)
  const {titles=[], columnIndex=[], list=[], buttons=[]} = listConfig

  let columns = [], content = [];
  let col = {}, cell = {};

  const alignMap = {
    '1':'left',
    '2':'center',
    '3':'right'
  }

  columnIndex.forEach((item) => {
    col = Lodash.find(titles, {dataColCode: item})
    // 处理title
    columns.push({
      title: col.dataColName,
      dataIndex: col.dataColCode,
      key: col.dataColCode,
      align: alignMap[col.align]?alignMap[col.align]:'left'
    })
  })
  // 操作按钮
  const handleButtonConfig = (buttonConfig,record) => {
    const menuOptions = Lodash.map(buttonConfig,(item,index)=>{
      const {functionName,...other} = item
      return{
        key:index+1,
        name:functionName,
        ...other
      }
    })
    // 点击操作按钮
    const handleMenuClick = (e) => {
      // 获取当前被点击按钮的配置参数
      const clickButtonConfig = Lodash.find(menuOptions,{'key':Number(e.key)})
      const { buttonType, valueSet } = clickButtonConfig // todo valueSet用于其他按钮
      switch (buttonType){
        case 'UPDATE':onEditItem(record);break;
        case 'DETAIL':onDetailItem(record);break;
        case 'DELETE':onDeleteItem(record);break;
      }
    }
    if (buttonConfig.length > 3) {
      return <DropOption onMenuClick={e=>handleMenuClick(e)}
                         menuOptions={menuOptions}/>
    }else {
      return buttonConfig.map((item,index) => {
        return (<div className="operation">
                <Button size="small" onClick={e=>handleMenuClick({key:index+1})}>{item.functionName}</Button>
          </div>)
      })
    }
  }
  // 高阶函数的应用
  const buttonJSX = (buttons)=>{
    return (record) =>{
      return handleButtonConfig(buttons,record)
    }
  }
  
  const newButtons = Lodash.filter(buttons,{functionPosition:2})
  // 如果有操作按钮
  if(newButtons.length>0){
    // 列表操作栏
    let opColumn = {
      title: '操作',
      key: 'operation',
      width: '240px',
      render: (record) => {
        return buttonJSX(newButtons)(record)
      },
      fixed:columns.length>8?"right":false
    }

    columns.push(opColumn)
  }


  // 处理列表list数据
  list.forEach((item) => {
    cell={}
    Lodash.forEach(item, (cellTemp) => {
      let {elementKey, elementValue} = cellTemp
      cell[elementKey] = elementValue
    })
    content.push(cell)
  })



  return (
    <div className="content-list">
      <CustomTable
        {...tableProps}
        dataSource={content}
        columns={columns}
        rowKey={record => record.id}
        scroll={{ x: columns.length>8?1800:0 }}
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
