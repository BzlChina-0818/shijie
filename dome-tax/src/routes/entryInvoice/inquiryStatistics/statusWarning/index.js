import React from 'react';
import { connect } from 'dva'
import { routerRedux, History } from 'dva/router'
import queryString from 'query-string'
import { Button } from 'antd'
import { Page } from 'components'
import SalesUnitNameModal from '../../../baseModule/salesUnitNameModal'
import TaxpayerBodyModal from '../../../baseModule/taxpayerBodyModal'
import { PATH } from "utils"
import SwFilter from './SwFilter'
import SwList from './SwList'
const path = PATH.INQUIRY_STATISTICS

/**
 * @description (进项发票>查询统计>发票状态跟踪及预警)
 * @author wangliang
 */

const StatusWarning = ({
                        statusWarning,
                        loading,
                        dispatch
                      }) => {
  let locationState = queryString.parse(location.search)
  const {query, pathname} = location
  const { list, pagination, pageType } = statusWarning

  const onEduce = () => {
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
      type:'statusWarning/onEduce',
      payload:{
        bizData
      }
    })
  }

  const onBack = () => {
    history.go(-1);
  }

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const swFilterProps = {
    onRunScriptChange(files){
      handleRefresh(files)
    },
    onModal(name){
      dispatch({
        type:'statusWarning/updateState',
        payload:{
          pageType:name,
        }
      })
    },
    onClearModal(name){
      if(name === "salesName"){
        dispatch({
          type:'statusWarning/InputSearch',
          payload:{
            salesName:''
          }
        })
      }else{
        dispatch({
          type:'statusWarning/InputSearch',
          payload:{
            purchaseName:''
          }
        })
      }
      
    }
  }
  
  const SwListProps = {
    dataSource:list,
    pagination,
    loading: loading.effects['statusWarning/query'],
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    toDetails(record){
      dispatch(routerRedux.push({
        pathname: path + `/statusWarning/detail/${record.formId}`
      }))
    }
  }

  const SalesUnitProps = {
    salesName:{
      onOk(ids){
        console.log(ids)
        dispatch({
          type:'statusWarning/InputSearch',
          payload:{
            salesName:ids.partnerName,
            salesTaxPayerNo:ids.taxCode,
          }
        })
        dispatch({
          type:'statusWarning/updateState',
          payload:{
            pageType:'',
          }
        })
      },
      onCancel(){
        dispatch({
          type:'statusWarning/updateState',
          payload:{
            pageType:'',
          }
        })
      },
    },
    purchaseName:{
      onOk(ids){
        console.log(ids)
        dispatch({
          type:'statusWarning/InputSearch',
          payload:{
            purchaseName:ids.taxPayer,
            purchaseTaxPayerNo:ids.taxPayerNo,
          }
        })
        dispatch({
          type:'statusWarning/updateState',
          payload:{
            pageType:'',
          }
        })
      },
      onCancel(){
        dispatch({
          type:'statusWarning/updateState',
          payload:{
            pageType:'',
          }
        })
      },
    },
  }

  return (
    <Page inner>
      <div className="op-btn-group">
        <Button className="margin-right" onClick={onEduce}>导出</Button>
        <Button className="margin-right" onClick={onBack}>返回</Button>
      </div>
      <SwFilter {...swFilterProps}></SwFilter>
      <SwList {...SwListProps}></SwList>
      { pageType === 'salesName' && <SalesUnitNameModal {...SalesUnitProps[pageType]}/> }
      { pageType === 'purchaseName' && <TaxpayerBodyModal {...SalesUnitProps[pageType]}/> }
    </Page>
  )
}

export default connect(({statusWarning, loading}) => ({statusWarning, loading}))(StatusWarning)