import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message as Meaasge} from 'antd'

import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.VAT_CALCULATE

/**
 * @description 增值税管理>增值税计算>增值税纳税信息表汇总
 * @author 林筱楠
 * @backEnd  liyue
 */
const TaxInformationSummary = ({
  location, dispatch, taxInformationSummary, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, selectedRows,  tableTypeList,
    reportedList, } = taxInformationSummary

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['taxInformationSummary/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (item) {
      dispatch({
        type: 'taxInformationSummary/delete',
        payload: item.vatFormId,
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/taxInformationSummary/update",
        search: queryString.stringify({
          id:item.vatFormId
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/taxInformationSummary/detail",
        search: queryString.stringify({
          id:item.vatFormId
        }),
      }))
    },
    onRow(record){
      return {
        onDoubleClick:() => {
          dispatch({
            type:'taxInformationSummary/updateState',
            payload:{
              pageType:'detail'
            }
          })
          dispatch(routerRedux.push({
            pathname: path+"/taxInformationSummary/detail",
            search:queryString.stringify({
              id:record.vatFormId
            })
          }))
        }
      }
    },
    rowSelection: {// todo 已汇总的不可选
      selectedRows,
      onChange: (keys,rows) => {
        dispatch({
          type: 'taxInformationSummary/updateState',
          payload: {
            selectedRows: rows,
          },
        })
      },
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    tableTypeList,
    reportedList,
    modalVisible,
    dispatch,
    groupName:taxInformationSummary.groupName,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  const buttonGroupProps={
    goCreate(){
      dispatch(routerRedux.push({
        pathname:path+"/taxInformationSummary/create",
      }))
    },
    onSum(){
      // 已选择列表行
      if(selectedRows.length>0){
        // todo 判断是否是同一时期的传递单
      }else{
        Meaasge.warning("请选择要汇总的数据！")
      }
    },
    // 导出取数规则
    onExportRule(){

    }
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

TaxInformationSummary.propTypes = {
  summaryTransfer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ taxInformationSummary, loading }) => ({ taxInformationSummary, loading }))(TaxInformationSummary)
