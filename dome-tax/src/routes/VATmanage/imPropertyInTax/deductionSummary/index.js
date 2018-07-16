import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.VAT_IMPROPERTYINTAX

/**
 * @description 增值税管理>不动产进项税管理>分期抵扣汇总
 * @author wangliang
 */
const DeductionSummary = ({
                            location,
                            dispatch, 
                            loading,
                            deductionSummary
                          }) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, formData } = deductionSummary

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const filterProps = {
    formData,
    modalVisible,
    dispatch,
    onFilterChange (value) {
      /* handleRefresh({
        ...value,
        page: 1,
      }) */
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['deductionSummary/query'],
    pagination,
    location,
    onChange (page) {
      /* handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      }) */
    },
    onDeleteItem (item) {
     
    },
    onEditItem (item) {
      /* dispatch(routerRedux.push({
        pathname:path+"/deductionSummary/update",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      })) */
    },
    onDetailItem(item) {
      
    },
  }
  
  const buttonGroupProps={
    onBack(){
      history.go(-1);
    },
    onCreate(){
      console.log(1)
    },
    onGenerate(){
      console.log(2)
    }
  }

  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}></ButtonGroup>
      <Filter {...filterProps}></Filter>
      <List {...filterProps}></List>
    </Page>
  )
}


export default connect(({ deductionSummary, loading }) => ({ deductionSummary, loading }))(DeductionSummary)
