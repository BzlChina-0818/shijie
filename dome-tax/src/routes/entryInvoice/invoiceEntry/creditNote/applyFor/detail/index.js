import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux, History} from 'dva/router'
import classnames from 'classnames'
import {connect} from 'dva'
import {Form, Input, Collapse, Radio, Button, Row, Col, Select, message} from 'antd'
import {UFormItem, ModalInputSearch,DetailList} from "components"
import {PATH, formValidMsg} from "utils"
import queryString from "query-string";
import dataConfig from "../dataConfig"
import moment from 'moment'
import ProcessApplyModal from "routes/baseModule/processApplyModal"
import { queryURL } from 'utils'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;

const Panel = Collapse.Panel
const {authenticationStatus, batchStatus} = dataConfig

/**
 * @description（进项发票管理>发票录入>红字发票申请）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */

const Create = ({
                  dispatch,

                  applyForDetail,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                    setFieldsValue
                  },
                }) => {
  // state or variable
  const {formData, pageType, isDisabled, modalVisible, isSave, workData} = applyForDetail
  const {authenticationStatus, batchStatus} = dataConfig
  /*
    const authenticationStatusListJSX = Object.keys(authenticationStatus).map(key => <Option key={key}
                                                                                             value={key}>{authenticationStatus[key]}</Option>)
    const batchStatusListJSX = Object.keys(batchStatus).map(key => <Option key={key}
                                                                           value={key}>{batchStatus[key]}</Option>)*/
  const databaseName = "红字发票申请"
  const onSelect = (e) => {
    if (e.target.value == 1) {
      setFieldsValue({applyNoTax: getFieldsValue().residuePrice})
      dispatch({
        type: 'applyForDetail/updateState',
        payload: {
          isDisabled: true,
        },
      })
    } else {
      setFieldsValue({applyNoTax: ""})
      dispatch({
        type: 'applyForDetail/updateState',
        payload: {
          isDisabled: false,
        },
      })
    }
  }
  let formItems = [
    {
      td: [
        {
          label: "红字发票申请单号",
          code: "redApplyNum",
          initialValue: formData.redApplyNum,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "红字发票通知单号",
          code: "notificationNo",
          initialValue: formData.notificationNo,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "申请人",
          code: "applyUserName",
          initialValue: formData.applyUserName,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },]
    },
    {
      td: [
        {
          label: "联系电话",
          code: "applyUserTel",
          initialValue: formData.applyUserTel,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "所属组织机构",
          code: "applyDeptName",
          initialValue: formData.applyDeptName,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "申请时间",
          code: "applyDate",
          initialValue: moment(formData.applyDate).format("YYYY-MM-DD") == "Invalid date" ? "" : moment(formData.applyDate).format("YYYY-MM-DD"),
          getFieldDecorator,
          inputEle:
            <Input disabled/>
        },
      ]
    },
    {
      td: [

        {
          label: "是否全额冲红",
          code: "isAll",
          initialValue: formData.formStatus == "1" ? (formData.isAll + '') : formData.isAll == "1" ? "是" : "否",
          getFieldDecorator,
          rules: [
            {
              required: true,
              message: formValidMsg("是否全额冲红")
            }
          ],
          inputEle: <RadioGroup
            name="isAll"
            initialValue={formData.isAll + ''}
            onChange={onSelect}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        },
        {
          label: "申请冲红不含税金额",
          code: "applyNoTax",
          initialValue: formData.applyNoTax,
          getFieldDecorator,
          rules: [
            {
              required: true,
              message: formValidMsg("申请冲红不含税金额")
            },
            {
              validator: (rule, value, callback, source, options) => {
                if (Number(formData.residuePrice) < Number(value)) {
                  callback(`申请冲红不含税金额不得大于可冲红不含税金额`);
                }
                else {
                  callback()
                }
              }
            }
          ],
          inputEle: <Input disabled={isDisabled} onBlur={e => {
            formData.applyNoTax = e.target.value;
          }}
          />
        },
        {
          label: "可冲红不含税金额",
          code: "residuePrice",
          initialValue: formData.residuePrice,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [

        {
          label: "原因",
          code: "cause",
          initialValue: formData.cause,
          rules: [
            {
              required: true,
              message: formValidMsg("原因")
            }
          ],
          getFieldDecorator,
          inputEle: <TextArea rows={4}/>
        },
        {
          label: "蓝字发票开票日期",
          code: "makeInvoiceDate",
          initialValue: moment(formData.makeInvoiceDate).format("YYYY-MM-DD") == "Invalid date" ? "" : moment(formData.makeInvoiceDate).format("YYYY-MM-DD"),

          getFieldDecorator,
          inputEle:
            <Input disabled/>
        },
        {
          label: "蓝字发票销货单位（供应商/合作伙伴）名称",
          code: "salesDeptName",
          initialValue: formData.salesDeptName,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [

        {
          label: "蓝字发票销货单位（供应商/合作伙伴）纳税识别号",
          code: "salesTaxPayerNo",
          initialValue: formData.salesTaxPayerNo,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "蓝字发票金额",
          code: "noTaxAmount",
          initialValue: formData.noTaxAmount,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "蓝字发票税率",
          code: "taxRate",
          initialValue: formData.taxRate,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [
        {
          label: "蓝字发票税额",
          code: "tax",
          initialValue: formData.tax,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "蓝字发票价税合计",
          code: "totalTax",
          initialValue: formData.totalTax,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "蓝字发票批状态",
          code: "batchStatus",
          initialValue: batchStatus[formData.batchStatus],

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    }, {
      td: [

        {
          label: "蓝字发票认证审核结果",
          code: "authenticationStatus",
          initialValue: authenticationStatus[formData.authenticationStatus],
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {},
        {}
      ]
    }


  ]
  // methods
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const onCreate = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      // todo 默认值
      let defaultValue = {}
      const backData = {
        ...formData,
        applyNoTax: formData.applyNoTax,
        ...getFieldsValue(),
        ...defaultValue,
        authenticationStatus: formData.authenticationStatus,
        batchStatus: formData.batchStatus
      }
      dispatch({
        type: "applyForDetail/create",
        payload: backData,
      }).then((data) => {
          if (data.success) {
            message.success(`保存${databaseName}成功`);
            let processDate = data.data
            const workData = {
              "runtimeCmdVO": {
                // "handlerId": processDate.applyUserId,
                "handlerId": "2",
                //"handlerName": processDate.applyUserName,
                "handlerName": "张三",
                "handlerDeptId": "3",
                //"handlerDeptId": processDate.applyDeptId,
                // "handlerDeptName": processDate.applyDeptName,
                "handlerDeptName": "财务部",
                "handlerCompId": "4",
                // "handlerCompId": processDate.applyComId,
                //"handlerCompName": processDate.applyComName,
                "handlerCompName": "北京分公司",
                // "handlerRoleId": processDate.applySecodDeptId,
                "handlerRoleId": "0",
                "handlerRoleName": "默认岗",
                // "handlerRoleName": processDate.applySecodDeptName,
                "tenantId": "100",
                //  "tenantId": processDate.ttCode,
                "processInstId": 0,
                "curTaskId": "0",

                "vars": {
                  "amount": 2000
                }
              },
              "bizDataVO": {
                "itemId": "010002",
                profsnlId: "22",
                deriveId: "22",
                deriveTable: "12",
                taxPayerNo: processDate.taxPayerNo,
                taxPayer: processDate.tax,
                period: "2",
                taxNo: "3",
                taxName: "3",
                type: "3",
                totalTaxAmount: "1",
                salesTaxPayer: processDate.salesDeptName,
                salesTaxPayerNo: "3",
                purchaseTaxPayer: "2",
                purchaseTaxPayerNo: "2",
              },
            }
            dispatch({
              type: "applyForDetail/updateState",
              payload: {
                isSave: true,
                workData: workData,
              }
            })
          } else {
            message.error(data.message);
          }
        }
      )
    })
  }

  const onGoSend = () => {
    if (isSave) {
      dispatch({
        type: 'applyForDetail/showModal',
      })
    }
    else {
      message.error(`请先保存`);
    }

  }
  const baseInfoProps = {

    dataSource: formItems,
    isDetail: pageType == 'detail',
  }
  const modalProps = {
    ...workData,
    onOk(data) {
      if (data.success){
        dispatch({
          type:"applyForDetail/updateFormstatus",
          payload:{
            id:queryURL('id'),
            formStatus:"2"
          }
        }).then((data)=>{
          dispatch({
            type:"applyForDetail/hideModal"
          })
          dispatch(routerRedux.push({
            pathname: '/entryInvoice/invoiceEntry/creditNote/inquire',
            payload:data
          }))
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'applyForDetail/hideModal',
      })
    },
  }

  const goBack = () => {
    history.go(-1)
  }
  //render
  return ( 
    <div className="form-pane detail-list">
      <div className="form-btn-group">
        <Button onClick={onCreate}>保存</Button>
        <Button onClick={onGoSend}>发送</Button>
        <Button onClick={goBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="基本信息" key="1">
          <DetailList {...baseInfoProps} />
        </Panel>
      </Collapse>
      {modalVisible && <ProcessApplyModal {...modalProps}/>}
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({applyForDetail, loading}) => ({applyForDetail, loading}))(Form.create()(Create))

