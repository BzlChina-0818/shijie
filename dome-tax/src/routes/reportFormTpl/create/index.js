import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, InputNumber, Upload, Icon, Radio,DatePicker, Button, Row, Col, Select,message, Collapse } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;


import { UFormItem, ModalInputSearch } from "components"
import { PATH, formValidMsg } from "utils"
const path = PATH.REPORT_FORM_TPL
import dataConfig from "../dataConfig"

import GroupTreeModal from "routes/baseModule/groupTreeModal"

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
}

function beforeUpload(file) {
  const reg=/[.](xlsx|xls|csv)$/   //匹配excel文件
  const fileName = file.name

  const isJPG = reg.test(fileName)
  if (!isJPG) {
    message.error('请上传后缀名为xlsx,xls,csv的文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('最大文件不超过10M');
  }
  return isJPG && isLt2M;
}
const Create=({
    dispatch,
    reportFormTplCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
    },
})=>{
    // state or variable
    const { formData, pageType, taxTypeList,  modalVisible } = reportFormTplCreate
    let handleDate = formData
    const databaseName = "报表模版"
    // 通过配置字典渲染Select下拉框内容
    const { templateTypeList, scopeList } = dataConfig
    const templateTypeListJSX = Object.keys(templateTypeList).map(key => <Option key={key} value={key}>{templateTypeList[key]}</Option>)
    const scopeListJSX = Object.keys(scopeList).map(key => <Option key={key} value={key}>{scopeList[key]}</Option>)

    const formItems = [
      {
        label:"报表名称",
        code:"templateName",
        initialValue:handleDate.templateName,
        rules:[
          {
            required: true,
            message: formValidMsg("报表名称")
          }
        ],
        getFieldDecorator,
        inputEle:<Input  />
      },
      {
        label:"报表简称",
        code:"simpleName",
        initialValue:handleDate.simpleName,
        rules:[
          {
            required: true,
            message: formValidMsg("报表简称")
          }
        ],
        getFieldDecorator,
        inputEle:<Input  />
      },
      {
        label:"报表类型",
        code:"templateType",
        initialValue:handleDate.templateType?handleDate.templateType+'':'1',
        rules:[
          {
            required: true,
            message: formValidMsg("报表类型")
          },
        ],
        getFieldDecorator,
        inputEle:<Select>{templateTypeListJSX}</Select>
      },
      {
        label:"税种",
        code:"taxNo",
        initialValue:handleDate.taxNo||taxTypeList&&taxTypeList.length>0&&taxTypeList[0].taxNo||"",
        rules:[
          {
            required: true,
            message: formValidMsg("税种")
          },
        ],
        getFieldDecorator,
        inputEle:<Select>
          {taxTypeList.map(item => (
            <Option key={item.taxNo} value={item.taxNo}>{item.taxName}</Option>
          ))}
        </Select>
      },
      {
        label:"适用组织",
        code:"groupNo",
        displayCode:"groupName",
        initialValue:handleDate.groupNo,
        initialDisplayValue:handleDate.groupName,
        rules:[
          {
            required: true,
            message: formValidMsg("适用组织")
          },
        ],
        getFieldDecorator,
        inputType: "modal",
        onSearchModal() {
          dispatch({
            type: "reportFormTplCreate/updateState",
            payload: {
              modalVisible:'groupTree'
            }
          });
        },
        onClear() {
          let formData = {}
          // 根据modal输入框类型，清空值,
          formData.groupNo = null
          formData.groupName = null
          setFieldsValue(formData)
          validateFields(['groupNo'])
        }
      },
      {
        label:"适用范围",
        code:"scope",
        initialValue:handleDate.scope?handleDate.scope+'':'1',
        rules:[
          {
            required: true,
            message: formValidMsg("适用范围")
          },
        ],
        getFieldDecorator,
        inputEle:<Select>{scopeListJSX}</Select>
      },
      {
        label:"启用状态",
        code:"enableStatus",
        initialValue:pageType=='detail'?(handleDate.enableStatus==1?"启用":"未启用"):(handleDate.enableStatus?handleDate.enableStatus+"":"1"),
        rules:[
          {
            required: true,
            message: formValidMsg("启用状态")
          },
        ],
        getFieldDecorator,
        inputEle:<RadioGroup name="enableStatus">
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </RadioGroup>
      },
      {
        label:"上传表样",
        code:"file",
        initialValue:"",
        rules:[
          {
            required: pageType==='create',
            message: formValidMsg("上传表样")
          },
        ],
        getFieldDecorator,
        inputEle:<Upload
          name="file"
          action="/upload.do"
          beforeUpload={beforeUpload}
          showUploadList={false}
          onChange={e=>handleChange}
        >
          <Button>
            <Icon type="upload" /> 上传表样
          </Button>
        </Upload>
      },
      {
        label:"生效时间",
        code:"effectiveDate",
        initialValue:moment(handleDate.effectiveDate),
        rules:[
          {
            required: true,
            message: formValidMsg("生效时间")
          },
        ],
        getFieldDecorator,
        inputEle: <DatePicker/>
      },
      {
        label:"报表说明",
        code:"templateDesc",
        initialValue:handleDate.templateDesc,
        rules:[
          {
            required: true,
            message: formValidMsg("报表说明")
          },
        ],
        getFieldDecorator,
        inputEle:<TextArea rows={4} />
      },
    ]

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        console.log(info)
      }
    }
    const modalProps = {
      onOk (data) {
        let formData = {}
        // 根据modal输入框类型，作不同的赋值

        formData.groupNo = data.code
        formData.groupName = data.name
        setFieldsValue(formData)

        dispatch({
          type: 'reportFormTplCreate/updateState',
          payload:{
            modalVisible:""
          }
        })
      },
      onCancel () {
        dispatch({
          type: 'reportFormTplCreate/updateState',
          payload:{
            modalVisible:""
          }
        })
      },
    }
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
        const {file,effectiveDate,...other} = getFieldsValue()

        let formData1 = new FormData(); //创建form对象
        if(file.file){
          formData1.append('file',file.file.originFileObj);
        }
        formData1.append('json',JSON.stringify({
          effectiveDate:moment(effectiveDate).format("YYYY-MM"),
          ...other,
          ...defaultValue
        }));

        let url = "",
            method = ""
        if(pageType==="create"){
            url = "reportFormTplCreate/create"
            method = "新增"
        }else{
            url = "reportFormTplCreate/update"
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
      })
    }
    const goBack=()=>{
      history.go(-1)
    }

    const onImport=()=>{
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
              <Panel header="基本信息" key="1">
                  <Form>
                    <Row gutter={24} type="flex" className='message'>
                      {
                        formItems.map((item,index) => (
                          <Col span={8} key={index}>
                            <UFormItem {...item} pageType={pageType}></UFormItem>
                          </Col>
                        ))
                      }
                      </Row>
                  </Form>
              </Panel>
            </Collapse>
            {modalVisible==='groupTree'&&<GroupTreeModal {...modalProps} />}
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ reportFormTplCreate, loading }) => ({ reportFormTplCreate, loading })) (Form.create()(Create))

