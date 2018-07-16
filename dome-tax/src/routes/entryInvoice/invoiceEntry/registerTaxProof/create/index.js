import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import classnames from 'classnames'
import { connect } from 'dva'
import { Form, Input, InputNumber, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
import { UFormItem, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.IINV
const Create=({
    dispatch,
    registerTaxProofCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
    // state or variable
  const { formData, pageType, modalInputConfig, isSave } = registerTaxProofCreate
  let handleDate=formData

  const databaseName = "登记发票"


    let formItems = [
    {
      label:"发票业务类型",
      code:"bizType",
      initialValue:handleDate.bizType||"1",
      rules:[
        {
          required: true,
          message: formValidMsg("发票业务类型")
        }
      ],
      getFieldDecorator,
      inputEle:<Select disabled>
        <Option value="1">非一点付费业务</Option>
      </Select>
    },
    {
      label:"发票批次",
      code:"invoiceBatch",
      initialValue:handleDate.invoiceBatch,
      rules:[
        {
          required: true,
          message: formValidMsg("发票批次")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
      label:"申请人",
      code:"applyUserId",
      initialValue:handleDate.applyUserId,
      rules:[
        {
          required: true,
          message: formValidMsg("申请人")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
      label:"申请时间",
      code:"applyDate",
      initialValue:handleDate.applyDate,
      rules:[
        {
          required: true,
          message: formValidMsg("申请时间")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
    {
      label:"所属组织机构",
      code:"reportDescribe",
      initialValue:handleDate.reportDescribe,
      rules:[
        {
          required: true,
          message: formValidMsg("所属组织机构")
        },
      ],
      getFieldDecorator,
      inputEle:<Input />
    },
      {
        label:"联系电话",
        code:"applyUserTel",
        initialValue:handleDate.applyUserTel,
        rules:[
          {
            required: true,
            message: formValidMsg("联系电话")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"专用发票类型",
        code:"invoiceTypeName",
        initialValue:handleDate.invoiceTypeName||"1",
        rules:[
          {
            required: true,
            message: formValidMsg("专用发票类型")
          },
        ],
        getFieldDecorator,
        inputEle:<Select disabled>
          <Option value="1">代扣代缴税收缴款凭证</Option>
        </Select>
      },
      {
        label:"缴款单位编码",
        code:"salesCompNo",
        initialValue:handleDate.salesCompNo,
        rules:[
          {
            required: true,
            message: formValidMsg("缴款单位编码")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"销货单位角色及对应系统",
        code:"salesRole",
        initialValue:handleDate.salesRole,
        rules:[
          {
            required: true,
            message: formValidMsg("销货单位角色及对应系统")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"缴款单位名称",
        code:"salesCompName",
        initialValue:handleDate.salesCompName,
        rules:[
          {
            required: true,
            message: formValidMsg("缴款单位名称")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"缴款单位纳税人识别号",
        code:"salesTaxPayerNo",
        initialValue:handleDate.salesTaxPayerNo,
        rules:[
          {
            required: true,
            message: formValidMsg("缴款单位纳税人识别号")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"纳税人识别号",
        code:"reportDescribe",
        initialValue:handleDate.reportDescribe,
        rules:[
          {
            required: true,
            message: formValidMsg("纳税人识别号")
          },
        ],
        getFieldDecorator,
        inputEle:<Input />
      },
      {
        label:"纳税人识名称",
        code:"reportDescribe",
        initialValue:handleDate.reportDescribe,
        rules:[
          {
            required: true,
            message: formValidMsg("纳税人识名称")
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
            url = "registerTaxProofCreate/create"
            method = "新增"
        }else{
            url = "registerTaxProofCreate/update"
            method = "修改"
        }
        dispatch({
          type: url,
          payload:data,
        }).then((data) =>{
            if(data.success){
              message.success(`${method}${databaseName}成功`);
              // goBack()
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

    const goSend=()=>{
      if(!checkSave("发送")){
        return
      }
      dispatch(routerRedux.push({
        pathname:path+"/registerTaxProof/create",
      }))
    }
    const goDelete=()=>{
      if(!checkSave("删除")){
        return
      }
      dispatch(routerRedux.push({
        pathname:path+"/registerTaxProof/create",
      }))
    }
    const goPrint=()=>{
      if(!checkSave("打印")){
        return
      }
      dispatch(routerRedux.push({
        pathname:path+"/registerTaxProof/create",
      }))
    }

    const checkSave=(str)=>{
      if(!isSave){
        message.warning(`请先保存再${str}`);
      }
      return isSave
    }

    //render
    return(
        <div className="form-pane condition-filter">
            <div className="form-btn-group">
              <Button onClick={onCreate}>保存</Button>
              <Button onClick={goSend}>发送</Button>
              <Button onClick={goDelete}>删除</Button>
              <Button onClick={goPrint}>打印</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <div className={classnames('form-content', { ['content-detail']: pageType=='detail' })} >
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
export default connect(({ registerTaxProofCreate, loading }) => ({ registerTaxProofCreate, loading })) (Form.create()(Create))

