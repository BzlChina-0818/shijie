/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, message } from 'antd'


const ButtonGroup = ({
    onIncreased,
    onBack,
  }) => {
  return (
    <div className="op-btn-group">
      <Button onClick={onIncreased}>新增</Button>
      <Button onClick={onBack}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
  goBack:PropTypes.func,
}

export default ButtonGroup
