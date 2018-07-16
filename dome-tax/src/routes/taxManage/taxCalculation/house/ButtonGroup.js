/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
                      onBack,
                      onCreate,
                      onCollect,
                      onDeleteBatches,
                      onBatchUpdate,
                    }) => {
  return (
    <div className="op-btn-group">
      <Button onClick={onBack} >返回</Button>
      <Button onClick={onCreate}>新增</Button>
      <Button onClick={onCollect}>汇总</Button>
      <Button onClick={onDeleteBatches}>批量删除</Button>
      <Button onClick={onBatchUpdate}>批量更新</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
  goBack:PropTypes.func,
}

export default ButtonGroup
