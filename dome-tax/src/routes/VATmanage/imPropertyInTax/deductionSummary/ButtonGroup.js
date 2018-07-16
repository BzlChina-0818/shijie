/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'


const ButtonGroup = ({
                      onBack,
                      onCreate,
                      onGenerate,
                    }) => {
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={onBack}>返回</Button>
      <Button className="margin-right" onClick={onCreate}>生成</Button>
      <Button className="margin-right" onClick={onGenerate}>生成计提</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  goCreate:PropTypes.func,
}

export default ButtonGroup
