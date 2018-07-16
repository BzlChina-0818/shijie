import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {message} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import Lodash from "lodash"
import List from './List'
import Filter from './Filter'
import { PATH } from "utils"
const path = PATH.TAX_CALCULATION

/*
 * @description 税金管理>税金计算>计算表生成监控
 * @author sunxianlu
 * * @backEnd wangweiqiang
 */

const TableMonitor = ({
  location, dispatch, taxCalculationTableMonitor, loading,
}) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const {taxNos,deaconResults,deaconTypes} = taxCalculationTableMonitor
  // const { list, pagination, modalVisible, currentCoaTypeInput,selectedRowKeys } = taxCalculationTableMonitor
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
    // dataSource: list,
    // loading: loading.effects['taxCalculationTableMonitor/query'],
    // pagination,
    // location,
    // onChange (page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // },
    // rowSelection: {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     dispatch({
    //       type: 'taxCalculationTableMonitor/updateState',
    //       payload: {
    //         selectedRowKeys: selectedRows,
    //       },
    //     })
    //   },
    // },
  }
  const filterProps = {
    filter: {
      deaconTypes,
      taxNos,
      deaconResults,
      ...locationState,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

TableMonitor.propTypes = {
  taxCalculationTableMonitor: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ taxCalculationTableMonitor, loading }) => ({ taxCalculationTableMonitor, loading }))(TableMonitor)
