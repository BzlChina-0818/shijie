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
 * @description 增值税管理>不动产进项税管理>分期抵扣明细
 * @author wangliang
 */
const DeductionDetail = ({
  location, dispatch, loading,deductionDetail
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible } = deductionDetail

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
    onProduce(){
      console.log(1)
    },
    onBack(){
      history.go(-1);
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['deductionDetail/query'],
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
      dispatch(routerRedux.push({
        pathname:path+"/deductionDetail/update",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
    onDetailItem(item) {
      
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    //modalVisible,
    dispatch,
    onFilterChange (value) {
      /* handleRefresh({
        ...value,
        page: 1,
      }) */
    },
  }

  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

DeductionDetail.propTypes = {
 
}

export default connect(({ deductionDetail, loading }) => ({ deductionDetail, loading }))(DeductionDetail)
