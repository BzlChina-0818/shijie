/* global document */
import React from 'react'
import { Button } from 'antd'

const ButtonGroup = ({
   goCreate
}) => {
  return (
    <div className="op-btn-group">
      <Button  onClick={goCreate}>新增</Button>
    </div>
  )
}

ButtonGroup.propTypes = {

}

export default ButtonGroup
