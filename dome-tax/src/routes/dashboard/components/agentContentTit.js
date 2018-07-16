import React from 'react'
import PropTypes from 'prop-types'
import styles from './agentContent.less'

const AgentContentTit = ({ titleLeft, titleRight }) => {
  return(
    <div className={styles.agentContentTit1}>
      {titleLeft ? <strong>{titleLeft}</strong> : ''}
      {titleRight ? <b>{titleRight}</b> : ''}
    </div>
  )
}

AgentContentTit.propTypes = {
  titleLeft:PropTypes.string,
  titleRight:PropTypes.string,
}

export default AgentContentTit