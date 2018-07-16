import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux, History} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import {PATH} from "utils"

const path = PATH.CUSTOMER_FORM

/**
 * @description 动态表单>功能定义
 * @author linxiaonan + guoqianyuan
 */
const Action = ({
                  location, dispatch, action, loading,
                }) => {
  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, isMotion, fileList
  } = action
  const {datasourceCode,datasourceId}=query
  const importConditon={datasourceCode,datasourceId}
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
    loading: loading.effects['action/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onEditItem(newQuery) {
      dispatch(routerRedux.push({
        pathname: path + "/action/update",
        search: queryString.stringify({
          datasourceId,
          id: newQuery.id
        }),
      }))
    },
    toDetail(newQuery) {
      dispatch(routerRedux.push({
        pathname: path + '/action/detail',
        search: queryString.stringify({
          datasourceId,
          id: newQuery.id
        }),
      }))
    },
  }
  const filterProps = {

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
    importConditon,
    onGoCreate() {
      dispatch(routerRedux.push({
        pathname: path + "/action/create",
        search: queryString.stringify({
          ...query
        })
      }))
    },
    onExport() {
      const condition = {
        functionCode: null,
        functionName: null,
        functionType: null,
        startDate: null,
        endDate: null,
        datasourceId: null
      }
      const page = {
        number: 0,
        size: 20
      }
      const sort = {
        direction: "ASC",
        property: "id"
      }

      for (let item in query) {
        if (item != 'page') {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: 'action/exportData',
        payload: {
          condition,
          page,
          sort
        }
      })
    },
    onImport(){
      handleRefresh()
    },

    onGoback() {
      history.go(-1)
    }
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <div>
        <p>查询结果</p>
        <List {...listProps} />
      </div>
    </Page>
  )
}

Action.propTypes = {
  invoiceCode: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({action, loading}) => ({
  action,
  loading,
}))(Action)
