/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, message } from 'antd'

const ButtonGroup = ({
                      onBack,
                      onCreate,
                      onCollect,
                      onUpdate,
                      onBatches,
                     }) => {

  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={onCreate}>新增</Button>
      <Button className="margin-right" onClick={onCollect}>汇总</Button>
      <Button className="margin-right" onClick={onUpdate}>批量更新</Button>
      <Button className="margin-right" onClick={onBatches}>批量删除</Button>
      <Button className="margin-right" onClick={onBack}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {

}

export default ButtonGroup
