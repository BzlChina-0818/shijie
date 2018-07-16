/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import Lodash from 'lodash'




const ButtonGroup = ({
   buttonConfig,
   goCreate
}) => {
  // 过滤不显示字段
  // console.log("buttonConfig "+buttonConfig)
  // let newButtonConfig = Lodash.filter(buttonConfig,{isShow:"1"})

  const handleButtonConfig = (buttonConfig)=>{
    return buttonConfig.map((item,index)=>{
      return (
        <Button  onClick={goCreate} key={index}>{item.functionName}</Button>
      )
    })
  }
  const buttonJSX = handleButtonConfig(buttonConfig)
  return (
    <div className="op-btn-group">
      {buttonJSX}
    </div>
  )
}

ButtonGroup.propTypes = {
  buttonConfig: PropTypes.array,
  goCreate: PropTypes.func,
}

export default ButtonGroup
