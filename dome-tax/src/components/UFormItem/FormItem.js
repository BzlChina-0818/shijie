import React , {Fragment} from 'react'
import {Form, Input, Button, Icon, Row, Col} from 'antd'

const ButtonGroup = Button.Group;
import styles from "../ModalInputSearch/ModalInputSearch.less"

const formItemLayoutDefault = {
  labelCol: {
    span: 8,
    style: {
      whiteSpace: 'normal',
    }
  },
  wrapperCol: {
    span: 16,
    style: {
      whiteSpace: 'normal',
    }

  },
}
const FormItem = Form.Item

class UFormItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /**
     * isDetail:页面类型,create/update/detail
     * inputEle:自定义输入组件，比如Input，Select
     * inputType:特殊输入框modal,
     * displayCode:展示的code,可没有
     * code:接口提交的code
     * initialDisplayValue:有可能表单提交时和实际显示的值不一样
     */
    let {
      label,
      formItemLayout = formItemLayoutDefault,
      code,
      displayCode,
      initialValue,
      initialDisplayValue,
      rules,
      getFieldDecorator,
      inputEle,
      inputType,
      onSearchModal,
      onClear,
      placeholder,
      customForm,
    } = this.props
    let {isDetail} = this.props

    const handleInput = (inputEle, inputType, isDetail) => {
      // 详情页
      if (isDetail) {
        return (
          <p>{initialValue}</p>
        )
      } else {
        // 如果有自定义元素，直接显示
        if (inputEle) {
          return customForm ? inputEle : (
            getFieldDecorator(code, {
              initialValue,
              rules,
            })(inputEle)
          )
        } else {
          // 如果为modal框输入框
          if (inputType == "modal") {
            return (
              <div className={styles.inputModalData}>
                {displayCode
                  ?
                  <Fragment>
                    {getFieldDecorator(code, {initialValue, rules})(
                      <Input style={{display: 'none'}}/>
                    )}
                    {getFieldDecorator(displayCode, {initialValue: initialDisplayValue})(
                      <Input placeholder={placeholder} disabled/>)}
                  </Fragment>
                  :
                  getFieldDecorator(code, {initialValue, rules})(
                    <Input placeholder={placeholder} disabled/>
                  )
                }

                {
                  <ButtonGroup>
                    <Button onClick={onSearchModal}><Icon type="search"/></Button>
                    <Button onClick={onClear.bind(null, code)}><Icon type="close-circle-o"/></Button>
                  </ButtonGroup>
                }
              </div>

            )
          }
        }
      }
    }
    const inputJSX = handleInput(inputEle, inputType, isDetail) ||(<span></span>)
    return (
      <Fragment>
        <FormItem label={label}  {...formItemLayout}>
          {inputJSX}
        </FormItem> 
      </Fragment>
    )
  }
}

export default UFormItem
