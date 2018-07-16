/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
                       onGoApplyFor
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={onGoApplyFor}>红字发票申请</Button>
    </div>
  )
}
ButtonGroup.propTypes = {
  onApplyFor:PropTypes.func,
}

export default ButtonGroup
