/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
     goCreate,
     onSum,
     onExportRule,
}) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={goCreate}>新增</Button>
      <Button className="margin-right" onClick={onSum}>汇总</Button>
      <Button className="margin-right" onClick={onExportRule}>导出取数规则</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
