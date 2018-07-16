import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, InputNumber, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;

import {UFormItem} from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.CUSTOMER_FORM

const Create=({
    dispatch,
    invoiceDetailCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
    // state or variable
    const { formData, pageType } = invoiceDetailCreate
    const databaseName = "数据源"
    // function Valid() {
    //   var validTimer = 1;
    //   return {
    //     valid:()=>{
    //         // validTimer = setTimeout( () => {
    //         //   let params = {
    //         //     id:formData.id,
    //         //     datasourceCode:value
    //         //   }
    //         //   dispatch({
    //         //     type: 'dataSourceCreate/uniqueData',
    //         //     payload:params,
    //         //   }).then((data) => {
    //         //     if(data.code===1010){
    //         //       callback(`数据源代码${value}已存在`);
    //         //     }else {
    //         //       callback()
    //         //     }
    //         //   })
    //         // },500)
    
    //         validTimer++
    //         console.log(validTimer)
    //     },
    //     getTime:()=>{
    //       return validTimer
    //     },
    //     clearTime:()=>{
    //       // clearTimeout(validTimer)
    //       // console.log(validTimer)
    //     }
    //   }
    // }
    // var ii = new Valid()

    let formItems = [
    {
      label:"发票单号",
      code:"datasourceCode",
      initialValue:formData.datasourceCode,
      rules:[
        {
          required: true,
          message: formValidMsg("数据源代码")
        },
        {
          validator: (rule, value, callback, source, options) => {
              let params = {
                id:formData.id,
                datasourceCode:value
              }
              dispatch({
                type: 'dataSourceCreate/uniqueData',
                payload:params,
              }).then((data) => {
                if(data.code===1010){
                  callback(`数据源代码${value}已存在`);
                }else {
                  callback()
                }
              })
          }
        }
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
      label:"购货单位名称",
      code:"datasourceName",
      initialValue:formData.datasourceName,
      rules:[
        {
          required: true,
          message: formValidMsg("数据源名称")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
      label:"购货单位纳税识别号",
      code:"delimiter",
      initialValue:formData.delimiter,
      rules:[
        {
          required: true,
          message: formValidMsg("数据项分隔符")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
        label:"购货单位税号",
        code:"delimiter",
        initialValue:formData.delimiter,
        rules:[
          {
            required: true,
            message: formValidMsg("数据项分隔符")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
    },
    {
      label:"发票审核状态",
      code:"isValid",
      initialValue:formData.isValid,
      rules:[
        {
          required: true,
          message: formValidMsg("数据源代码",'select')
        },
      ],
      getFieldDecorator,
      inputEle:<Select>
        <Option value="">请选择</Option>
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
    },
    {
      label:"发票起号码",
      code:"reportDescribe",
      initialValue:formData.reportDescribe,
      rules:[
        {
          required: true,
          message: formValidMsg("数据对象描述")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
        label:"发票止号码",
        code:"reportDescribe",
        initialValue:formData.reportDescribe,
        rules:[
          {
            required: true,
            message: formValidMsg("数据对象描述")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
  ]
    // methods
    const onCreate= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }

        // todo 默认值
        let defaultValue={
            id:formData.id
        }
        const data = {
          ...getFieldsValue(),
          ...defaultValue
        }
        let url = "",
            method = ""
        if(pageType==="create"){
            url = "dataSourceCreate/create"
            method = "新增"
        }else{
            url = "dataSourceCreate/update"
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
      dispatch(routerRedux.push({
        pathname:path+'/dataSource'
      }))
    }


    //render
    return(
        <div className="form-pane condition-filter">
            <div className="form-btn-group">
              <Button onClick={onCreate} >保存</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <div className="form-content">
                <Form>
                  <Row gutter={24} type="flex">
                    {
                      formItems.map((item,index) => (
                        <Col span={8} key={index}>
                          <UFormItem {...item} pageType={pageType}></UFormItem>
                        </Col>
                      ))
                    }
                  </Row>
            </Form>
            </div>
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ invoiceDetailCreate, loading }) => ({ invoiceDetailCreate, loading })) (Form.create()(Create))

