import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import AddInvoice from "../../../../baseModule/invoiceTemplate/VAT";
import ButtonGroup from './ButtonGroup'

/**
 * @description（增值税管理>增值税税基管理>销项发票税基）
 * @author linxiaonan
 * @backEnd chenhao
 */
const SalesInvoiceTaxDetail = ({
  location, dispatch, salesInvoiceTaxDetail, loading
}) => {
  const {updateData}=salesInvoiceTaxDetail
  const buttonGroupProps = {
    onGoback() {
      history.go(-1)
    }
  }
  const addInvoiceProps = {
    title: "增值税发票",
    updateData
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
       <AddInvoice {...addInvoiceProps}/>
    </Page>
  )
}

SalesInvoiceTaxDetail.propTypes = {
    AddInvoiceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ salesInvoiceTaxDetail, loading }) => ({ salesInvoiceTaxDetail, loading }))(SalesInvoiceTaxDetail)
