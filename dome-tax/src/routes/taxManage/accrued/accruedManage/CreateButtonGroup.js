/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
     goCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={goCreate}>生成计提日记账</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
