import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Pagination  } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
//import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, toDetail,location, ...tableProps
}) => {
   //location.query = queryString.parse(location.search)
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    }else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          onDeleteItem(record.pId)
        },
      })
    }else if (e.key==='3'){
      toDetail(record)
    }
  }
  const columns = [
    {
      title: '打印池代码',
      dataIndex: 'printPoolCode',
      key: '0',
      width: 200,
    }, {
      title: '打印池名称',
      dataIndex: 'printPoolName',
      key: '1',
    }, {
      title: '所属区域',
      dataIndex: 'address',
      key: '2',
    }, {
      title: '启用标识',
      dataIndex: 'isOpen',
      key: '3',
      render: text => (<span>{text
        ? '启用'
        : '未启用'}</span>),
    }, {
      title: '开始使用日期',
      dataIndex: 'startTime',
      key: '4',
    }, {
      title: '结束使用日期',
      dataIndex: 'endTime',
      key: '5',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption  onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' },{key:'3',name:'详情'}]} />)
        // <span>
        //   <a href="javascript:;" onClick={e=>editId(record,e)}>修改</a>
        //   <a onClick={e => deleteId(record, e)}>删除</a>
        //   <Link to={`printingPool/${record.id}`}>详情</Link>
        // </span>
      }
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <div className="content-list">
       <Table
      {...tableProps}
    //   className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
    //   scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      size='small'
      // scroll={{ y: 240 }}
    />
    </div>

  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
