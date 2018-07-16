import React from 'react'
import queryString from 'query-string'
import { Button, message } from 'antd'
import { connect } from 'dva'
import {routerRedux} from 'dva/router'
import  ButtonGroup from './ButtonGroup'
import { Page } from 'components'
import SalesUnitNameModal from '../../../baseModule/salesUnitNameModal'
import TaxpayerBodyModal from '../../../baseModule/taxpayerBodyModal'
import Filter from './Filter'
import List from './List'

/**
 * @description (进项发票>发票录入>税控认证结算导入及匹配)
 * @author wangliang
 */

const Authentication = ({
                          dispatch,
                          authentication,
                          loading
                       }) => {

  const { pageType, list, pagination, formId, messageHint  } = authentication
  const locationState = queryString.parse(location.search);
  const {query, pathname} = location
  const {datasourceCode,datasourceId}=locationState
  const importConditon={datasourceCode,datasourceId}

  // 提示信息
  const info = (messageText) => {
    message.info(messageText);
  };

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }
  
  const buttonGroupProps = {
    importConditon,
    onBack() {
      history.go(-1);
    },
    onEduce(){
      let bizData = {
        "page": {
          "number": "0",
          "size": "10"
        },
        "sort": {
          "direction": "ASC",
          "property": ""
        },
        "condition": {
          
        }
      }
      dispatch({
        type:'authentication/onEduce',
        payload:{
          bizData
        }
      })
    },
    
    /* 按钮匹配 */
    onMatch() {
      formId || info('请选择您要匹配的项');
      formId && dispatch({
        type:'authentication/onMatch',
        payload:{
          bizData:formId,
          onMessage(messageHint){
            info(messageHint);
            messageHint == '匹配成功' && location.reload();
          }
        }
      })  
    },
    onDelete() {
      formId || info('请选择您要删除的项');
      formId && dispatch({
        type:'authentication/onDelete',
        payload:{
          bizData:formId,
          onMessage(messageHint){
            info(messageHint);
            messageHint == '删除成功' && location.reload();
          }
        }
      })  
    },
    onTask() {
      dispatch({
        type:'authentication/onTask',
        payload:{
          modalTitle:'任务'
        }
      })
      dispatch({
        type:'authentication/onParticipant'
      })
    },
  }

  const listProps = {
    dataSource:list,
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onRowSelectionChange(formId){
      dispatch({
        type:'authentication/updateState',
        payload:{
          formId
        }
      })
    },
    loading: loading.effects['authentication/query'],  
  }

  const filterProps = {
    onCancel(){
      
    },
    handleOk() {
      
    },
    onRunScriptChange(files){
      handleRefresh(files)
    },
    onIsModule(name){
      dispatch({
        type:'authentication/updateState',
        payload:{
          pageType:name
        }
      })
    },
    onClearInputSearch(name){
      dispatch({
        type:'authentication/ClearInputSearch',
        payload:{
          name
        },
      })
    },
    onOk(data){
      
    }
  }

  const ModalProps = {
    salesName: {
      onOk(record){
        dispatch({
          type:'authentication/InputSearch',
          payload:{
            salesName:record.partnerName,
            salesTaxPayerNo:record.taxCode,
          },
        })
        dispatch({
          type:'authentication/updateState',
          payload:{
            pageType:''
          }
        })
      },
      onCancel(){
        dispatch({
          type:'authentication/updateState',
          payload:{
            pageType:''
          }
        })
      }
    },
    purchaseName: {
      onOk(record){
        dispatch({
          type:'authentication/InputSearch',
          payload:{
            purchaseName:record.taxPayer,
            purchaseTaxPayerNo:record.taxPayerNo,
          },
        })
        dispatch({
          type:'authentication/updateState',
          payload:{
            pageType:''
          }
        })
      },
      onCancel(){
        dispatch({
          type:'authentication/updateState',
          payload:{
            pageType:''
          }
        })
      }
    }
  }

  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}></ButtonGroup>
      <Filter { ...filterProps }></Filter>
      <List { ...listProps }></List>
      { pageType === 'salesName' && <SalesUnitNameModal {...ModalProps[pageType]}/> }
      { pageType === 'purchaseName' && <TaxpayerBodyModal  {...ModalProps[pageType]}/> }
    </Page>
  )
}

export default connect(({authentication, loading}) => ({authentication, loading}))(Authentication)