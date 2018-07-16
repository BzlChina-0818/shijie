import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'dva'
import Lodash from "lodash"
import moment from "moment"

import { Form, Input, InputNumber, DatePicker, Collapse, Button, Select, message, Radio } from 'antd'
const { MonthPicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { UFormItem, ModalInputSearch, DetailList } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.VAT_TAXBASE

import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
const Create=({
    dispatch,
    planPaymentCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      setFieldsValue,
    },
})=>{
    // state or variable
  const { formData, pageType, advancesTypeList, modalVisible } = planPaymentCreate
  let handleDate = formData
  const databaseName = "预收款明细"
  const typeListJSX = advancesTypeList.map(key => <Option key={key.fldValue} value={key.fldValue}>{key.dispValue}</Option>)
  // 新增
  const formItems = [
    {
      td:[
        {
          label:"纳税主体",
          code:"taxPayerNo",
          displayCode:"taxPayer",
          initialValue:handleDate.taxPayerNo,
          initialDisplayValue:handleDate.taxPayer,
          rules:[
            {
              required: true,
              message: formValidMsg("纳税主体")
            },
          ],
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "planPaymentCreate/updateState",
              payload: {
                modalVisible:"taxpayerBody"
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
        {}
      ]
    },
    {
      td: [
        {
          label:"项目名称",
          code:"itemName",
          initialValue:handleDate.itemName,
          rules:[
            {
              required: true,
              message: formValidMsg("项目名称")
            }
          ],
          getFieldDecorator,
          inputEle:<Input  />
        },
        {
          label:"项目代码",
          code:"itemNo",
          initialValue:handleDate.itemNo,
          rules:[
            {
              required: true,
              message: formValidMsg("项目代码")
            }
          ],
          getFieldDecorator,
          inputEle:<Input  />
        }
      ]
    },
    {
      td: [
        {
          label:"收入确认开始期间",
          code:"confirmPeriod",
          initialValue:moment(handleDate.confirmPeriod),
          getFieldDecorator,
          inputEle:<MonthPicker  />
        },
        {
          label:"所属期间",
          code:"period",
          initialValue:moment(handleDate.period),
          rules:[
            {
              required: true,
              message: formValidMsg("所属期间")
            }
          ],
          getFieldDecorator,
          inputEle:<MonthPicker  />
        }
      ]
    },
    {
      td: [
        {
          label:"类型",
          code:"advanceType",
          initialValue:handleDate.advanceType||advancesTypeList.length>0&&advancesTypeList[0].fldValue,
          rules:[
            {
              required: true,
              message: formValidMsg("类型")
            }
          ],
          getFieldDecorator,
          inputEle:<Select>
            {typeListJSX}
          </Select>
        },
        {
          label:"项目描述",
          code:"itemDesc",
          initialValue:handleDate.itemDesc,
          getFieldDecorator,
          inputEle:<Input  />
        }
      ]
    },
    {
      td: [
        {
          label:"预收款金额",
          code:"planPaymentsAmount",
          initialValue:handleDate.planPaymentsAmount,
          rules:[
            {
              required: true,
              message: formValidMsg("预收款金额")
            }
          ],
          getFieldDecorator,
          inputEle:<InputNumber  precision={2}  placeholder="格式：0.00" />
        },
        {
          label:"确认期数",
          code:"confirmNum",
          initialValue:handleDate.confirmNum,
          rules:[
            {
              required: true,
              message: formValidMsg("确认期数")
            }
          ],
          getFieldDecorator,
          inputEle:<Input  />
        }
      ]
    },
    {
      td: [
        {
          label:"税率",
          code:"rate",
          initialValue:handleDate.rate||'3',
          rules:[
            {
              required: true,
              message: formValidMsg("税率")
            }
          ],
          getFieldDecorator,
          inputEle:<RadioGroup>
            <RadioButton value="3">3</RadioButton>
            <RadioButton value="6">6</RadioButton>
            <RadioButton value="10">10</RadioButton>
            <RadioButton value="16">16</RadioButton>
          </RadioGroup>
        },
        {
          label:"税额",
          code:"taxAmount",
          initialValue:handleDate.taxAmount,
          rules:[
            {
              required: true,
              message: formValidMsg("税额")
            }
          ],
          getFieldDecorator,
          inputEle:<InputNumber  precision={2}   placeholder="格式：0.00"/>
        }
      ]
    }
  ]
  // 修改
  const updateFormItems = [
    {
      td:[
        {
          label:"序号",
          code:"no",
          initialValue:handleDate.no,
          // inputEle:<Input  />,
          // isDetail:true,
        },
        {
          label:"项目代码",
          code:"itemNo",
          initialValue:handleDate.itemNo,
          // inputEle:<Input  />,
          // isDetail:true,

        },
      ]
    },
    {
      td:[
        {
          label:"纳税识别号",
          code:"taxPayerNo",
          initialValue:handleDate.taxPayerNo,
        },
        {
          label:"项目名称",
          code:"itemName",
          initialValue:handleDate.itemName,
        },
      ]
    },
    {
      td:[
        {
          label:"纳税主体名称",
          code:"taxPayer",
          initialValue:handleDate.taxPayer,
        },
        {
          label:"类型",
          code:"advanceType",
          initialValue:handleDate.advanceType,
        },
      ]
    },
    {
      td:[
        {
          label:"收入确认开始期间",
          code:"confirmPeriod",
          initialValue:moment(handleDate.confirmPeriod),
          getFieldDecorator,
          inputEle:<MonthPicker  />
        },
        {
          label:"所属期间",
          code:"period",
          initialValue:moment(handleDate.period),
          rules:[
            {
              required: true,
              message: formValidMsg("所属期间")
            }
          ],
          getFieldDecorator,
          inputEle:<MonthPicker  />
        }
      ]
    },
    {
      td:[
        {
          label:"预收款金额",
          code:"planPaymentsAmount",
          initialValue:handleDate.planPaymentsAmount,
          rules:[
            {
              required: true,
              message: formValidMsg("预收款金额")
            }
          ],
          getFieldDecorator,
          inputEle:<InputNumber  precision={2}  placeholder="格式：0.00" />
        },
        {
          label:"确认期数",
          code:"confirmNum",
          initialValue:handleDate.confirmNum,
          rules:[
            {
              required: true,
              message: formValidMsg("确认期数")
            }
          ],
          getFieldDecorator,
          inputEle:<Input  />
        }
      ]
    },
    {
      td: [
        {
          label:"税率",
          code:"rate",
          initialValue:handleDate.rate||'3',
          rules:[
            {
              required: true,
              message: formValidMsg("税率")
            }
          ],
          getFieldDecorator,
          inputEle:<RadioGroup>
            <RadioButton value="3">3</RadioButton>
            <RadioButton value="6">6</RadioButton>
            <RadioButton value="10">10</RadioButton>
            <RadioButton value="16">16</RadioButton>
          </RadioGroup>
        },
        {
          label:"税额",
          code:"taxAmount",
          initialValue:handleDate.taxAmount,
          rules:[
            {
              required: true,
              message: formValidMsg("税额")
            }
          ],
          getFieldDecorator,
          inputEle:<InputNumber  precision={2}   placeholder="格式：0.00"/>
        }
      ]
    },
    {
      td:[
        {
          label:"项目描述",
          code:"itemDesc",
          initialValue:handleDate.itemDesc,
          isDetail:true,
        },
        {}
      ]
    },
  ]
  const TaxpayerBodyModalProps = {
    onOk (data) {
      let formData = {}
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      dispatch({
        type: 'planPaymentCreate/updateState',
        payload: {
          modalVisible:""
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'planPaymentCreate/updateState',
        payload: {
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

        // 默认值
        let defaultValue={
            id:formData.id
        }
        let fields = getFieldsValue()
        const {confirmPeriod,period} = fields
        fields.confirmPeriod = moment(confirmPeriod).format('YYYY-MM')
        fields.period = moment(period).format('YYYY-MM')
        const data = {
          bizData:{
            ...fields,
            ...defaultValue,
          }
        }
        let url = "",
            method = ""
        if(pageType==="create"){
            url = "planPaymentCreate/create"
            method = "新增"
        }else{
            url = "planPaymentCreate/update"
            method = "修改"
        }
        dispatch({
          type: url,
          payload: data,
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

    const baseInfoProps = {
      dataSource:pageType==='create'?formItems:updateFormItems,
      isDetail:false,
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
                  <DetailList {...baseInfoProps} />
              </Panel>
            </Collapse>
            {modalVisible=='taxpayerBody'&&<TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ planPaymentCreate, loading }) => ({ planPaymentCreate, loading })) (Form.create()(Create))

