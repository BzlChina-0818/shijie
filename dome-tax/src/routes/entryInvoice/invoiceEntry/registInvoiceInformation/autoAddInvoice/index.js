//自动添加模块
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,message } from 'antd'
import Lodash from "lodash"
import { Page,SelectModal} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
// import Modal from './Modal'
import { PATH } from "utils"
const AutoAddInvoice = ({
  location, dispatch, loading,autoAddInvoice
}) => {
  const {selectedIds}=autoAddInvoice
  const invoiceState=queryString.parse(location.search)
  const {invoiceType,invoiceBatch}=invoiceState
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  const buttonGroupProps = {
    invoiceType:invoiceType,
    onBack() {
      history.go(-1)
    },
    onSave(){
      if(selectedIds&&selectedIds.length>0){
        dispatch({
          type:'autoAddInvoice/autoSave',
          payload:{
            idList:selectedIds,
            invoiceBatch:invoiceBatch
          }
        })
      }else{
        message.warning('请选择要新增的发票信息')
      }
    },
    onImport(){
      handleRefresh()
    },
    onReload(){
      window.location.reload()
    }
  }
  const filterProps = {
    // filter: {
    //   ...query,
    // },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const listProps = {
    // dataSource: list,
    // loading: loading.effects['outputFormat/query'],
    // pagination,
    // location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:'/addInvoiceDetail',
        search: queryString.stringify({
          formId:item.formId
        }),
      }))
    },
    rowSelection: { 
        onChange: (selectedRowKeys, selectedRows) => {
          const selectedIds = Lodash.map(selectedRows, "id");
        dispatch({
          type: 'autoAddInvoice/updateState',
          payload: selectedIds,
        })
      },
    },
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      {invoiceType&&invoiceType==='01' &&<Filter {...filterProps}/>}
      <List {...listProps}/>
    </Page>
  )
}
AutoAddInvoice.propTypes = {
  autoAddInvoice: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ autoAddInvoice, loading }) => ({ autoAddInvoice, loading }))(AutoAddInvoice)
