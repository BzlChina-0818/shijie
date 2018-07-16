/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
  onProduce,
  onBack,
}) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={onProduce}>生成</Button>
      <Button className="margin-right" onClick={onBack}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
