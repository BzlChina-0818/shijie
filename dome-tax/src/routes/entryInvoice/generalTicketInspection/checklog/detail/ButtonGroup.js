/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
                       onGoback
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={onGoback}>返回</Button>
    </div>
  )
}
export default ButtonGroup
