import React from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'antd'
import { request } from 'utils'
import lodash from 'lodash'
import styles from './SelectModal.less';
import ModalFilter from './ModalFilter'
import ModalList from './ModalList'
// import './CustomTable.less'

 class SelectModal extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {filters, filterLeft, filterRight, filterFlagBtn, ModalListProps, listFlag, ...other} = this.props
    return ( 
      <Modal  {...other}>
        {<ModalFilter filterFlagBtn={filterFlagBtn} filter={filters} filterLeft={filterLeft} filterRight={filterRight}/>}
        {!listFlag && <ModalList {...ModalListProps}></ModalList>}
      </Modal>
    )
  }
} 

SelectModal.propTypes = {
  modalOpts: PropTypes.object,
  filterConfig: PropTypes.array,
  ModalList: PropTypes.object,
}
export default SelectModal
