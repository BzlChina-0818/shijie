import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd';
import styles from './agentContent.less'
import AgentContentTit from './agentContentTit'


const AgentContentLeft = ({
                            columns,
                            list
                          }) => {
  return (
    <div className={styles.br1}>
      <AgentContentTit titleLeft="我的待办" titleRight="17"/>
      <Table columns={columns} dataSource={list} pagination={false} boreder/>
      <div className={styles.agentOnLoadMore}>加载更多(共10条记录)</div>
    </div>
  )
}

export default AgentContentLeft