import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import Lodash from 'lodash'

import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import {PATH} from "utils"

const path = PATH.DYNAMIC_TEMPLATE


/**
 * @description 动态表单>动态模版实现
 * @author guoqianyuan
 */
const DynamicTemplate = ({
                      location, dispatch, dynamicTemplate, loading,history
                    }) => {

  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list,
    pagination,
    selectedRowKeys,
    dtConfig,
    tableName,
    PKid,
  } = dynamicTemplate
  // 结构返回配置参数
  const {titles, buttons, columnIndex, params} = dtConfig
  // 查询条件
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
    listConfig: {
      titles,
      columnIndex,
      list,
      buttons,// todo 列表中按钮code
    },
    loading: loading.effects['dynamicTemplate/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem(record) {
      dispatch({
        type: 'dynamicTemplate/delete',
        payload: {
          id: record[PKid],
          tableName
        },
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem(record) {
      dispatch(routerRedux.push({
        pathname: path + "/update",
        search: queryString.stringify({
          id: record[PKid],
          tableName
        }),
        state:{
          tableName
        }
      }))
    },
    onDetailItem(record) {
      dispatch(routerRedux.push({
        pathname: path + "/detail",
        search: queryString.stringify({
          id: record[PKid],
          tableName
        }),
      }))
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'dynamicTemplate/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
    filterConfig: params,
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
    buttonConfig: Lodash.filter(buttons, {functionPosition: 1}),
    goCreate() {
      dispatch(routerRedux.push({
        pathname: path + "/create",
        search: queryString.stringify({
          tableName
        })
      }))
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

DynamicTemplate.propTypes = {
  dynamicTemplate: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({dynamicTemplate, loading}) => ({dynamicTemplate, loading}))(DynamicTemplate)
