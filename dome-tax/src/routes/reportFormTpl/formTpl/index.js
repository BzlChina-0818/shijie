import React from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, InputNumber, Upload, Icon, Radio,DatePicker, Button, Row, Col, Select,message, Collapse } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;
import FormTpl from "routes/baseModule/formTpl"


import { UFormItem, ModalInputSearch } from "components"
import { PATH, formValidMsg } from "utils"
const path = PATH.REPORT_FORM_TPL



const FormTplEdit=({
    dispatch,
    reportFormTplConfig,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
    },
})=>{
    // state or variable
    const { formData, pageType } = reportFormTplConfig
    let handleDate = formData
    const databaseName = "报表模版"

    // methods
    // 创建ref
    const originFormTpl = handleDate.html //原始模版
    // let inputEles = document.querySelectorAll("input[utax-input-index]");//可以修改的输入框
    // inputEles.addEventListener("click",()=>{
    //   console.log(11)
    // },false)
    const onCreate= ()=>{

        // 查出已修改的input
        const formEle = document.getElementById("formTplForm")
        let changedFormEles = Lodash.filter(formEle.elements, (ele) => {
          return ele.hasAttribute("changed")
        })
        let values = Lodash.map(changedFormEles,(ele)=>{
          return{
            id:ele.id,
            oldValue:ele.getAttribute("utax-input-index"),
            value:ele.value,
          }
        })
        //获取最新的html
        let newHtml = document.getElementById("formTpl").innerHTML
        // todo 默认值
        let defaultValue={
            id:formData.id
        }
        const {file,effectiveDate,...other} = getFieldsValue()

        let formData1 = new FormData(); //创建form对象
        formData1.append('file',file.file.originFileObj);
        formData1.append('json',JSON.stringify({
          effectiveDate:moment(effectiveDate).format("YYYY-MM"),
          ...other,
          ...defaultValue
        }));

        let url = "",
            method = ""
        if(pageType==="create"){
            url = "reportFormTplConfig/create"
            method = "新增"
        }else{
            url = "reportFormTplConfig/update"
            method = "修改"
        }
        dispatch({
          type: url,
          payload: formData1,
        }).then((data) =>{
            if(data.success){
              message.success(`${method}${databaseName}成功`);
              goBack()
            }else{
              message.error(data.message);
            }
          }

        )

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
            <Collapse className="collapse" defaultActiveKey={['1']} >
              <Panel header="报表" key="1">
                <Form id="formTplForm">
                  <FormTpl html={handleDate.html}/>
                </Form>
              </Panel>
            </Collapse>
        </div>
    )
}
FormTplEdit.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ reportFormTplConfig, loading }) => ({ reportFormTplConfig, loading })) (Form.create()(FormTplEdit))

