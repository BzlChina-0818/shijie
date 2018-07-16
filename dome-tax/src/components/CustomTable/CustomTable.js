import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { request } from 'utils'
import lodash from 'lodash'
import styles from './CustomTable.less';
// import './CustomTable.less'

class CustomTable extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { Title, ...tableProps } = this.props
    return ( 
      <div className="content-list">
          <div className={styles.customTable}>
              {
                Title === undefined && <div className={styles.customTableHead}>查询结果</div>
              }
              <div className={styles.customTableContent}>
                  <Table
                  size='small'
                  // rowKey={record => record.uid}
                  {...tableProps}
                  />
              </div>  
              </div>
      </div>
    )
  }
} 
export default CustomTable
