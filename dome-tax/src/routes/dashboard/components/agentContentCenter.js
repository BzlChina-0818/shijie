import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd';
import styles from './agentContent.less'
import TitList from './titList'
import AgentContentTit from './agentContentTit'

const AgentContentCenter = ({
                              statusData
                            }) => {
  return (
    <div className={styles.br1}>
      <AgentContentTit titleLeft="发票状态" titleRight="2018年05月"/>
      <TitList statusData={statusData}/>
    </div>
  )
}

export default AgentContentCenter