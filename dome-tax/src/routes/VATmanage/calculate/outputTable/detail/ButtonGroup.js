/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const ButtonGroup = ({
                       onExport, onGoCreate,onGoback,onGoSend
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={onGoCreate}>保存</Button>
      <Button  onClick={onExport}>导出</Button>
      <Button  onClick={onGoSend}>发送</Button>
      <Button  onClick={onExport}>取数规则查询</Button>
      <Button  onClick={onGoback}>返回</Button>

    </div>
  )
}
ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
