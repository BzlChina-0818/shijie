import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Message} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
import TaxpayerBodyModal from 'routes/baseModule/taxpayerBodyModal'
import SalesUnitNameModal from 'routes/baseModule/salesUnitNameModal'
const InvoiceTaskPool = ({
    location, dispatch, invoiceTaskPool, loading
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname} = location
  const {
    list, pagination, selectedRowKeys,formData,modalVisible,modalInputConfig,choiceModalInput
  } = invoiceTaskPool
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
    dataSource: list,
    loading: loading.effects['invoiceTaskPool/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      console.log(item)
      dispatch(routerRedux.push({
        pathname:"/entryInvoice/specialCertification/invoiceTaskPool/detail",
        state: queryString.stringify({
          id:item.formProcess.id
        }),
      }))
    },
    onReceiveItem(item){
      console.log(item)
    },
    rowSelection: { 
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'invoiceTaskPool/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    filter: {
      ...query,
      ...formData
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onShowModal (type) {
      console.log(type)
      dispatch({
        type: 'user/showModal',
        payload: queryString.stringify({
          id:item.id
        }),
      })
    },
    onSearch(name){
      dispatch({
        type: 'invoiceTaskPool/updateState',
        payload: {
          modalVisible:name
        },
      })
    },
    onClear(){
      dispatch({
        type: 'invoiceTaskPool/updateState',
        payload: {
          formData:{}
        },
      })
    },
    onReset(){
      dispatch({ 
        type: 'invoiceTaskPool/updateState',
        payload: {formData:{}}
      })
    }
  }
  const modalProps = {
    onOk (data) {
      console.log(data)
      if(modalVisible==='applyCompName'){
        formData.applyCompName=data.taxPayer
        formData.purchaseTaxPayerNo=data.taxPayerNo
      }else if(modalVisible==='salesTaxPayer'){
        formData.salesTaxPayer=data.partnerName
        formData.salesTaxPayerNo=data.partnerMdmCode
      }  
      dispatch({
        type: 'invoiceTaskPool/selectSuccess',
        payload: formData,
      })
      dispatch({
        type: 'invoiceTaskPool/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'invoiceTaskPool/hideModal',
      })
    },
  }
  const buttonGroupProps={
    onBatchReceive(){
      console.log(111)
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
      {modalVisible==='applyCompName' && <TaxpayerBodyModal {...modalProps} />}
      {modalVisible==='salesTaxPayer' && <SalesUnitNameModal {...modalProps} />}
    </Page>
  )
}

InvoiceTaskPool.propTypes = {
  registInvoiceInformation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ invoiceTaskPool, loading }) => ({ invoiceTaskPool, loading }))(InvoiceTaskPool)
