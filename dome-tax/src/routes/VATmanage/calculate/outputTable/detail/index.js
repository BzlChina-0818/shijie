import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm} from 'antd'
import {Page} from 'components'
import queryString from 'query-string'
import styles from './index.less'
import {Form} from "antd/lib/index";
import ButtonGroup from "./ButtonGroup"
import ProcessApplyModal from "routes/baseModule/processApplyModal"
/**
 * @description（增值税管理>增值税计算>增值税进项基础表）
 * @author linxiaonan
 * @backEnd lijinkai
 */

const Detail = ({
                  modalVisible,  location, dispatch, VATCalculationSheetDetail, loading
                }) => {

  location.query = queryString.parse(location.search)

  const buttonGroupProps={
    onGoback(){
      history.go(-1)
    },
    onGoSend ()  {
      dispatch({
        type: 'VATCalculationSheetDetail/showModal',
      })
    }
  }

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
      taxPayerNo: "",
      taxPayer: "",
      period: "2",
      taxNo: "3",
      taxName: "3",
      type: "3",
      totalTaxAmount: "1",
      salesTaxPayer: "",
      salesTaxPayerNo: "3",
      purchaseTaxPayer: "2",
      purchaseTaxPayerNo: "2",
    },
  }

  const modalProps = {
    ...workData,
    onOk(data) {
      if (data.success){
        dispatch({
          type:"VATCalculationSheetDetail/hideModal"
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'VATCalculationSheetDetail/hideModal',
      })
    },
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      {modalVisible && <ProcessApplyModal {...modalProps}/>}
    </Page>
  )
}

Detail.propTypes = {
  AddInvoiceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({VATCalculationSheetDetail, loading}) => ({
  VATCalculationSheetDetail, loading
}))(Form.create()(Detail))
