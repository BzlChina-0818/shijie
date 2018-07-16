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
const path = PATH.ENTRY_INVOICE

/**
 * @description 进项发票管理>发票录入>登记代扣代缴税收缴款凭证
 * @author guoqianyuan
 */

const RegisterTaxProof = ({
  location, dispatch, registerTaxProof, loading,
}) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination } = registerTaxProof
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
    loading: loading.effects['registerTaxProof/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/registerTaxProof/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
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
        pathname:path+"/registerTaxProof/create",
      }))
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

RegisterTaxProof.propTypes = {
  registerTaxProof: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ registerTaxProof, loading }) => ({ registerTaxProof, loading }))(RegisterTaxProof)
