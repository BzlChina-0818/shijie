import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import Vat from 'routes/baseModule/invoiceTemplate/VAT'

const VATDetail = ({
  location, dispatch, VAT, loading
}) => {
  const {VatData}=VAT
  const vatProps={
    title:'增值税专用发票',
    updateData:{
      ...VatData
    }
  }
  return (
    <Vat {...vatProps}/> 
  )
}

VATDetail.propTypes = {
    VAT: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ VAT, loading }) => ({ VAT, loading }))(VATDetail)
