import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Modal} from 'antd'
import {Page, SelectModal} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

/**
 * @description（进项发票管理>专用发票获取>已获取进项发票管理）
 * @author linxiaonan
 * @backEnd liyue
 */
const ObtainedEntry = ({
                         location, dispatch, obtainedEntry, loading
                       }) => {

  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, onStreamlineFlag, modalVisible, filterData, invoiceTypeList, currentCoaTypeInput
  } = obtainedEntry

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
    loading: loading.effects['obtainedEntry/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname: "/entryInvoice/obtainedEntry/detail",
        search: queryString.stringify({
          id: item.id
        }),
      }))
    },

  }

  const filterProps = {
    invoiceTypeList,
    filterData,
    modalVisible,
    currentCoaTypeInput,
    dispatch,
    onStreamlineFlag,
    filter: {
      ...query,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },


  }

  const buttonGroupProps = {
    onExport() {
      const condition = {
        invoiceCode: null,
        invoiceNum: null,
        salesNum: null,
        invoiceType: null,
        purchaseNum: null,
        startDate: null,
        endDate: null,
        startImportDate: null,
        endImportDate: null,
        registerStatus: null,
        authStatus: null,
        startAuthDate: null,
        endAuthDate: null,
      }
      for (let item in query) {
        if (item != "page") {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: "obtainedEntry/exportData",
        payload: {
          condition
        }
      })
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

ObtainedEntry.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({obtainedEntry, loading}) => ({obtainedEntry, loading}))(ObtainedEntry)
