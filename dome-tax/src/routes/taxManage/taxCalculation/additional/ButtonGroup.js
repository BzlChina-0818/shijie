/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
     goCreate,
     onSummary,
     onBatchDelete,
     onBatchUpdate
}) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={goCreate}>新增</Button>
      <Button className="margin-right" onClick={onSummary}>汇总</Button>
      <Button className="margin-right" onClick={onBatchDelete}>批量删除</Button>
      <Button className="margin-right" onClick={onBatchUpdate}>批量更新</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
