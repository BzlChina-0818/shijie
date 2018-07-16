/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
   goCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={goCreate}>新增</Button>
      <Button  onClick={goCreate}>开具及打印</Button>
      <Button  onClick={goCreate}>纸票打印</Button>
      <Button  onClick={goCreate}>作废</Button>
      <Button  onClick={goCreate}>清单打印</Button>
      <Button  onClick={goCreate}>复制</Button>
      <Button  onClick={goCreate}>已开专票同步</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
