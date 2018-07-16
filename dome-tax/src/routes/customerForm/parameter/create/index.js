import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Form, Input, Select, Icon, DatePicker, Collapse, message, Radio, Button, Row, Col} from 'antd'

import {Page, FilterItem} from 'components'
import queryString from 'query-string'
import classnames from "classnames";
import {UFormItem, ModalInputSearch} from "components"
import {PATH, formValidMsg} from "utils"
import dataConfig from "../dataConfig"

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

/**
 * @description 动态表单>参数逻辑
 * @author linxiaonan + guoqianyuan
 */
const Create = ({
                  dispatch,
                  onChange,
                  parameterCreate,
                  location,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  const {updateData, pageType} = parameterCreate

  const locationState = queryString.parse(location.search)
  const databaseName = "参数功能"
  const {parameterTypeList, inputModeList} = dataConfig
  const parameterTypeListJSX = Object.keys(parameterTypeList).map(key => <Option key={key}
                                                                                 value={key}>{parameterTypeList[key]}</Option>)
  const inputModeListJSX = Object.keys(inputModeList).map(key => <Option key={key}
                                                                         value={key}>{inputModeList[key]}</Option>)
  let formItems = [
    {
      label: "参数代码", code: "parameterCode", initialValue: updateData.parameterCode, rules: [
        {
          required: true,
          message: formValidMsg("参数代码")
        },
      ], getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "参数名称", code: "parameterName", initialValue: updateData.parameterName, rules: [
        {
          required: true,
          message: formValidMsg("参数名称")
        },
      ], getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "参数类型", code: "parameterType",
      initialValue: pageType == 'detail' ? (parameterTypeList[updateData.parameterType]) : updateData.parameterType || "1",
      rules: [
        {
          required: true,
          message: formValidMsg("参数类型", 'select')
        },
      ], getFieldDecorator,
      inputEle: <Select>
        {parameterTypeListJSX}
      </Select>
    },
    {
      label: "参数顺序", code: "parameterSort", initialValue: updateData.parameterSort, rules: [
        {
          required: true,
          message: formValidMsg("参数顺序",)
        },
      ], getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "是否必填",
      code: "isRequired",
      initialValue: pageType == 'detail' ? (updateData.isRequired == 1 ? "是" : "否") : updateData.isRequired || "1",
      rules: [
        {
          required: true,
          message: formValidMsg("是否必填", 'select')
        },
      ],
      getFieldDecorator,
      inputEle: (
        <RadioGroup
          name="isRequired"
        >
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </RadioGroup>
      )
    },
    {
      label: "是否显示",
      code: "isShow",
      initialValue: pageType == 'detail' ? (updateData.isShow == 1 ? "是" : "否") : updateData.isShow || "1",
      rules: [
        {
          required: true,
          message: formValidMsg("是否显示", 'select')
        },
      ],
      getFieldDecorator,
      inputEle: (
        <RadioGroup
          name="isShow"
        >
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </RadioGroup>
      )
    },
    {
      label: "录入方式",
      code: "inputMode",
      initialValue: pageType == 'detail' ? (inputModeList[updateData.inputMode]) : updateData.inputMode || "1",
      rules: [
        {
          required: true,
          message: formValidMsg("录入方式", 'select')
        },
      ],
      getFieldDecorator,
      inputEle: <Select>
        {inputModeListJSX}
      </Select>
    },
    {
      label: "对应值集", code: "valueset", initialValue: updateData.valueset, getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "格式掩码", code: "formatMask", initialValue: updateData.formatMask, getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "默认值", code: "parameterDefault", initialValue: updateData.parameterDefault, getFieldDecorator,
      inputEle: <Input/>
    },
  ]
  const onCreate = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      // todo 默认值
      let defaultValue = {}
      const {datasourceId, datasourceCode, id} = locationState
      const data = {
        ...getFieldsValue(),
        ...defaultValue,
        datasourceId,
        datasourceCode,
        id
      }
      let url = "",
        method = ""
      if (pageType === "create") {
        url = "parameterCreate/create"
        method = "新增"
      } else {
        url = "parameterCreate/update"
        method = "修改"
      }
      dispatch({
        type: url,
        payload: data,
      }).then((data) => {
          if (data.success) {
            message.success(`${method}${databaseName}成功`);
            goBack()
          } else {
            message.error(data.message);
          }
        }
      )
    })
  }
  const goBack = () => {
    history.go(-1)
  }

  return (  
    <div className="form-pane detail-list">
      <div className="form-btn-group">
        {pageType!=='detail'&&<Button onClick={onCreate} >保存</Button>}
        <Button onClick={goBack} >返回</Button>
      </div>
      <Collapse className="collapse mb10" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1">
          <Form>
            <Row gutter={24} type="flex" className='message'>
              {
                formItems.map((item, index) => (
                  <Col span={8} key={index}>
                    <UFormItem {...item} isDetail={pageType==='detail'}></UFormItem>
                  </Col>
                ))
              }
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({parameterCreate, loading}) => ({
  parameterCreate,
  loading,
}))(Form.create()(Create))
