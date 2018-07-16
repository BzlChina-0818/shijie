/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
   goCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={goCreate}>批量领取</Button>
    </div>
  )
}
ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
