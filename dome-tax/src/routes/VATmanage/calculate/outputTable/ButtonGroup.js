/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
                       onExport, onGoCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={onGoCreate}>新增</Button>
      <Button  onClick={onExport}>导出取数规则</Button>

    </div>
  )
}
ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
