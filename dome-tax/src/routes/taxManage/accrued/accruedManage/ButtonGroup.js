/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
     goCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={goCreate}>新增</Button>
      <Button className="margin-right" >导入</Button>
      <Button className="margin-right" >导出</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
