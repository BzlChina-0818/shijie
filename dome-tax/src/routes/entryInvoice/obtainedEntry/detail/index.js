import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux, History} from 'dva/router'
import {connect} from 'dva'
import queryString from 'query-string'
import {Form, } from 'antd'

import AddInvoice from "../../../baseModule/invoiceTemplate/VAT";
import MotorVehicles from "../../../baseModule/invoiceTemplate/VAT";
import VATElectronicOrdinary from "../../../baseModule/invoiceTemplate/VAT";
import ButtonGroup from './ButtonGroup'

/**
 * @description（进项发票管理>专用发票获取>已获取进项发票管理）
 * @author linxiaonan
 * @backEnd liyue
 */
const Create = ({
                  obtainedEntryDetail,
                }) => {
  const {updateData} = obtainedEntryDetail

  const addInvoiceProps = {
    title: "增值税专用发票",
    updateData
  }
  const motorVehiclesProps = {
    title: "机动车发票",
    updateData
  }
  const electronicOrdinaryProps = {
    title: "通行费 增值税电子普通发票",
    updateData
  }
  const invoiceProps = {
    title: "普通发票",
    updateData
  }
  const buttonGroupProps = {
    onGoback() {
      history.go(-1)
    }
  }
  //render
  return (
    <div className="form-pane condition-filter">
      <ButtonGroup {...buttonGroupProps}/>
      {updateData.invoiceType == '01' && <AddInvoice {...addInvoiceProps} />}
      {updateData.invoiceType == '04' && <AddInvoice {...invoiceProps} />}
      {updateData.invoiceType == '02' && <VATElectronicOrdinary {...electronicOrdinaryProps} />}
      {updateData.invoiceType == '03' && <MotorVehicles {...motorVehiclesProps} />}
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({obtainedEntryDetail, loading}) => ({obtainedEntryDetail, loading}))(Form.create()(Create))

