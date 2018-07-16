import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import classnames from 'classnames'
import Lodash from 'lodash'

import { Form, Input, InputNumber, Radio,DatePicker,Collapse, Cascader,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item
const { RangePicker } = DatePicker;
const Panel = Collapse.Panel;

import { PATH,formValidMsg } from "utils"
import {UFormItem} from "components"
/**
 * @description 动态表单>动态模版实现
 * @author guoqianyuan
 */
const Create=({
    dispatch,
    location,
    history,
    dynamicTemplateCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
    // state or variable
    let { formData={}, pageType, formConfig, PKid, tableName } = dynamicTemplateCreate
    // 数据源名称databaseName
    const { detailList } =  formConfig
    const  databaseName = formConfig.datasourceName

    let newFormConfig = Lodash.sortBy(detailList,"datacolSort")
    newFormConfig = Lodash.filter(newFormConfig,{"isShow":1,'isPk':0})
    // console.log(newFormConfig)

    let formItems = newFormConfig.map(item => {
      const {inputMode,datacolName,datacolCode,isRequired,isModify} = item
      let inputEle = null
      let inputType = false
      // 1手工录入,2下拉列表,3下拉列表(多选),4列表选择,5列表选择(多选),6日期（弹出框）,7期间（弹出框）
      switch (Number(inputMode)){
        case 1: inputEle=<Input disabled={isModify!=1}/>;  break;
        case 2: inputEle=<Select disabled={isModify!=1}></Select>;  break;
        case 3: inputEle=<Select disabled={isModify!=1} mode="multiple"></Select>;  break;
        case 4: inputType=true;break;
        case 5: inputType=true;break;
        case 6: inputEle=<DatePicker  disabled={isModify!=1}></DatePicker> ;  break;
        case 7: inputEle=<RangePicker disabled={isModify!=1}></RangePicker>;  break;
        default:inputEle=<Input />
      }

      return    {
        label:datacolName,
        code:datacolCode,
        initialValue:formData[datacolCode]||"",
        rules:isRequired==1?[
          {
            required: true,
            message: formValidMsg(datacolName)
          },
        ]:[],
        getFieldDecorator,
        inputType,
        inputEle
      }
    })
    // methods
    // 处理表单数据
    const handleFormFieldsValue = ()=>{
      const fieldsValue = getFieldsValue()
      const fieldsKey = Object.keys(fieldsValue)
      if(newFormConfig.length>0){
        return Lodash.map(fieldsKey,(item)=>{
          return {
            columnName:item,
            columnValue:fieldsValue[item],
            isRequired:Lodash.find(newFormConfig,{datacolCode:item}).isRequired
          }
        })
      }else{
        return []
      }

    }
    const onCreate= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }

        // todo 默认值.主键不一定是id
        let defaultValue={
        }

        const data = {
          tableName,
          dataList:handleFormFieldsValue()
        }
        let url = "",
          method = ""
        if(pageType==="create"){
          url = "dynamicTemplateCreate/create"
          method = "新增"
        }else{
          data.pId="id"
          data.pValue=formData.id
          url = "dynamicTemplateCreate/update"
          method = "修改"
        }
        dispatch({
          type: url,
          payload:data,
        }).then((data) =>{
            if(data.success){
              message.success(`${method}${databaseName}成功`);
              goBack()
            }else{
              message.error(data.message);
            }
          }

        )
      })
    }
    const goBack=()=>{
      history.go(-1)
    }

    //render
    return(
        <div className="form-pane detail-list">
            <div className="form-btn-group">
              <Button onClick={onCreate} >保存</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <Collapse className="collapse mb10" defaultActiveKey={['1']} >
              <Panel header="基本信息" key="1">
                <Form>
                    <Row gutter={24} type="flex">
                      {
                        formItems.map((item,index) => (
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
  dynamicTemplateCreate: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ dynamicTemplateCreate, loading }) => ({ dynamicTemplateCreate, loading })) (Form.create()(Create))

