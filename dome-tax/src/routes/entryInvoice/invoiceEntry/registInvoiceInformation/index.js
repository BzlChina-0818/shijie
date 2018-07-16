import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page,SelectModal} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
// import Modal from './Modal'
import { PATH } from "utils"
import TaxpayerBodyModal from 'routes/baseModule/taxpayerBodyModal'
import SalesUnitNameModal from 'routes/baseModule/salesUnitNameModal'
const path = PATH.ENTRY_INVOICE
const RegistInvoiceInformation = ({
  location, dispatch, registInvoiceInformation, loading
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname} = location
  const {
    list, pagination, selectedRowKeys,formData,modalVisible,pathType
  } = registInvoiceInformation
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const listProps = {
    pathType,
    dataSource: list,
    loading: loading.effects['registInvoiceInformation/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({ 
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (record) {
      dispatch({
        type: 'registInvoiceInformation/delete',
        payload: record.formId,
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem (item) {
      const url=pathType==='registInvoiceInformation'?'registInvoiceInformation':'registerTaxProof'
      dispatch(routerRedux.push({
        pathname:`${path}/${url}/update`,
        search: queryString.stringify({
          formId:item.formId,
          invoiceType:item.invoiceType,
          invoiceBatch:item.invoiceBatch,
          pathType:pathType
        }),
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'registInvoiceInformation/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    formData,
    pathType,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    changInput (name){ 
      dispatch({
        type: 'registInvoiceInformation/updateState',
        payload: {
          choiceModalInput:name
        }
      })
    },
    onSearch(name){
      dispatch({
        type: 'registInvoiceInformation/updateState', 
        payload: {
          modalVisible:name
        },
      })
    },
    onClear(name){
      if(name==='purchaseName'){
        formData.purchaseName=''
        formData.purchaseTaxPayerNo=''
      }else if(name==='salesName'){
        formData.salesName=''
        formData.salesTaxPayerNo=''
      }  
      dispatch({ 
        type: 'registInvoiceInformation/updateState',
        payload: formData
      })
    },
    onReset(){
      dispatch({ 
        type: 'registInvoiceInformation/updateState',
        payload: {formData:{}}
      })
    }
  }

  const modalProps = {
    onOk (data) {
      if(modalVisible==='purchaseName'){
        formData.purchaseName=data.taxPayer
        formData.purchaseTaxPayerNo=data.taxPayerNo
      }else if(modalVisible==='salesName'){
        formData.salesName=data.partnerName
        formData.salesTaxPayerNo=data.textCode
      }
      dispatch({
        type: 'registInvoiceInformation/selectSuccess',
        payload: formData,
      })
      dispatch({
        type: 'registInvoiceInformation/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'registInvoiceInformation/hideModal',
      })
    },
  }
  const buttonGroupProps={
    goCreate(){
      const url=pathType==='registInvoiceInformation'?'registInvoiceInformation':'registerTaxProof'
      dispatch(routerRedux.push({
        pathname:path+`/${url}/create`,
        search: queryString.stringify({
          pathType:pathType
        }),
      }))
    },
    onGoback(){
      history.go(-1)
    }
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible==='purchaseName' && <TaxpayerBodyModal {...modalProps} />}
      {modalVisible==='salesName' && <SalesUnitNameModal {...modalProps} />}
    </Page>
  )
}

RegistInvoiceInformation.propTypes = {
  registInvoiceInformation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ registInvoiceInformation, loading }) => ({ registInvoiceInformation, loading }))(RegistInvoiceInformation)
