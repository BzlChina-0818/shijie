import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, Collapse, Radio,DatePicker, Icon, Modal,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

import { UFormItem, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.VAT_CALCULATE

const modal = ({
                 item = {},
                 onOk,
                 onSearchModal,
                 onClear,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   setFieldsValue,
                 },
                 ...modalProps
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const values = getFieldsValue()
      const data = {
        period:moment(values.period).format("YYYY-MM"),
        taxPayerNo:values.taxPayerNo,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title:"生成汇总计算表",
    ...modalProps,
    onOk: handleOk,
  }

  const formItems = [
    {
      label:"所属期间",
      code:"period",
      initialValue:item.period,
      rules:[
        {
          required: true,
          message: formValidMsg("所属期间")
        }
      ],
      getFieldDecorator,
      inputEle:<DatePicker />
    },
    {
      label:"编制单位",
      code:"taxPayerNo",
      displayCode:"taxPayer",
      initialValue:item.taxPayerNo,
      initialDisplayValue:item.taxPayer,
      rules:[
        {
          required: true,
          message: formValidMsg("编制单位")
        },
      ],
      getFieldDecorator,
      inputType: "modal",
      onSearchModal,
      onClear() {
        let formData = {}
        formData.taxPayerNo = null
        formData.taxPayer = null
        setFieldsValue(formData)
        validateFields(['taxPayerNo']),
        onClear()
      }
    },
  ]

  return (
    <Modal {...modalOpts}>
        <Form layout="horizontal">
          {
            formItems.map((item,index) => (
                <UFormItem {...item} isDetail={false} key={index}></UFormItem>
            ))
          }
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
