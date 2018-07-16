import React from 'react'
import { Table,Button } from 'antd'
import styles from './List.less'
import { DropOption } from 'components'
import { Modal } from 'antd/lib/index'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const { confirm } = Modal
const List = ({onDeleteItem,onEditItem, onIssue, isMotion, location, ...tableProps }) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onIssue(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  const columns = [
    {
      title: '模型ID',
      dataIndex: 'deploymentId',
      key:'id'
    }, {
      title: '模型名称',
      dataIndex: 'name',
      key:'name'
    }, {
      title: '模型标识',
      dataIndex: 'key',
      key:'key'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key:'createTime'
    }, {
      title: '最后更新时间',
      dataIndex: 'lastUpdateTime',
      key:'lastUpdateTime'
    }, {
      title: '部署ID',
      dataIndex: 'deploymentId',
      key:'deploymentId'
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      dataIndex:'operation',
      render:(text, record)=>{
        return  (
          <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '发布' }, { key: '2', name: '删除' }]} />

        )
      }
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames(styles.table, { [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        rowSelection={rowSelection}

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
