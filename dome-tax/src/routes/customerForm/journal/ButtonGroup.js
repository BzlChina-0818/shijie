/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
  onExport,
  goBack
}) => {
  return (
    <div className="op-btn-group">
      <Button onClick={onExport}>导出</Button>
      <Button onClick={goBack} >返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
  goBack:PropTypes.func,
}

export default ButtonGroup
