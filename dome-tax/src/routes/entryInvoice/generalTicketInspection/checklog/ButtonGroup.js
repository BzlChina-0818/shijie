/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
                       onExport
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={onExport}>导出</Button>
    </div>
  )
}
ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
