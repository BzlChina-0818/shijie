import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, Collapse, Radio,DatePicker, Icon, Table,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

import { UFormItem, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.VAT_CALCULATE
import { NormTypeList } from 'enums'

import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
const Create=({
    dispatch,
    summaryTransferCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
    },
})=>{
    // state or variable
    const { formData, pageType, modalVisible } = summaryTransferCreate
    let handleDate=formData
    const NormTypeListJSX = Object.keys(NormTypeList).map(key => <Option key={key} value={key}>{NormTypeList[key]}</Option>)

    const databaseName = "增值税汇总传递单"

    const formItems = [
      {
        label:"所属期间",
        code:"period",
        initialValue:handleDate.period,
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
        initialValue:handleDate.taxPayerNo,
        initialDisplayValue:handleDate.taxPayer,
        rules:[
          {
            required: true,
            message: formValidMsg("编制单位")
          },
        ],
        getFieldDecorator,
        inputType: "modal",
        onSearchModal() {
          dispatch({
            type: 'summaryTransferCreate/updateState',
            payload: {
              modalVisible: "taxpayerBody"
            }
          });
        },
        onClear() {
          let formData = {}
          formData.taxPayerNo = null
          formData.taxPayer = null
          setFieldsValue(formData)
          validateFields(['taxPayerNo'])
        }
      },
      {
        label:"指标类型",
        code:"status",
        initialValue:handleDate.status||"",
        rules:[
          {
            required: true,
            message: formValidMsg("指标类型")
          },
        ],
        getFieldDecorator,
        inputEle:<Select>
          <Option value="">请选择</Option>
          {NormTypeListJSX}
        </Select>
      },
    ]
    // 纳税主体
    const TaxpayerBodyModalProps = {
      onOk (data) {
        let formData = {}
        formData.taxPayerNo = data.taxPayerNo
        formData.taxPayer = data.taxPayer
        setFieldsValue(formData)
        hideModal()
      },
      onCancel () {
        hideModal()
      },
    }

    const hideModal = ()=>{
      dispatch({
        type: "summaryTransferCreate/updateState",
        payload:{
          modalVisible:""
        }
      });
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
        const {period,...other} = getFieldsValue()
        const data = {
          bizData:{
            period:moment(period),
            ...other,
            ...defaultValue,
          }
        }
        let url = "",
            method = ""
        if(pageType==="create"){
            url = "summaryTransferCreate/create"
            method = "新增"
        }else{
            url = "summaryTransferCreate/update"
            method = "修改"
        }
        dispatch({
          type: url,
          payload: data,
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
            <Collapse className="collapse" defaultActiveKey={['1']}>
              <Panel header="基本信息" key="1">
                  <Form>
                    <Row gutter={24} type="flex" className='message'>
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
          {modalVisible==='taxpayerBody'&&<TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ summaryTransferCreate, loading }) => ({ summaryTransferCreate, loading })) (Form.create()(Create))

