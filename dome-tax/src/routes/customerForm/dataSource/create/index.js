import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import classnames from 'classnames'
import { connect } from 'dva'
import { Form, Input, InputNumber, Radio,DatePicker,TimePicker,Icon, Collapse,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
import { UFormItem, ModalInputSearch, DetailList } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.CUSTOMER_FORM


/*
 * @description 动态表单>数据源管理
 * @author guoqianyuan
 */
const Create=({
    dispatch,
    dataSourceCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
    // state or variable
  const { formData, pageType, modalInputConfig } = dataSourceCreate
  let handleDate=formData

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
    //
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
        td:[
          {
            label:"数据源代码",
            code:"datasourceCode",
            initialValue:handleDate.datasourceCode,
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
            inputEle:<Input disabled={pageType!='create'}/>
          },
          {
            label:"数据源名称",
            code:"datasourceName",
            initialValue:handleDate.datasourceName,
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
            label:"数据项分隔符",
            code:"delimiter",
            initialValue:handleDate.delimiter,
            rules:[
              {
                required: true,
                message: formValidMsg("数据项分隔符")
              },
            ],
            getFieldDecorator,
            inputEle:<Input />
          },
        ]
      },
      {
        td: [
          {
            label:"启用标识",
            code:"isValid",
            initialValue:pageType=='detail'?(handleDate.isValid==1?"是":"否"):handleDate.isValid||"1",
            rules:[
              {
                required: true,
                message: formValidMsg("启用标识",'select')
              },
            ],
            getFieldDecorator,
            inputEle:
              <RadioGroup>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
          },{},{}
        ]
      },
      {
        entireLine:true,
        td: [
          {
            label:"数据对象描述",
            code:"reportDescribe",
            initialValue:handleDate.reportDescribe,
            rules:[
              {
                required: true,
                message: formValidMsg("数据对象描述")
              },
            ],
            getFieldDecorator,
            inputEle:<TextArea rows={4} />
          }
        ]
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
        const params = {
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
          payload:params,
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

    const baseInfoProps = {
      dataSource:formItems,
      isDetail:pageType==='detail',
    }
    //render
    return(
        <div className="form-pane detail-list">
            <div className="form-btn-group">
              {pageType!=='detail'&&<Button onClick={onCreate} >保存</Button>}
              <Button onClick={goBack} >返回</Button>
            </div>
            <Collapse className="collapse mb10" defaultActiveKey={['1']} >
              <Panel header="基本信息" key="1">
                <DetailList {...baseInfoProps} />
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
export default connect(({ dataSourceCreate, loading }) => ({ dataSourceCreate, loading })) (Form.create()(Create))

