import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm, message} from 'antd'
import {Page} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

/**
 * @description 动态表单>输出格式
 * @author sunxianlu + guoqianyuan
 */
const OutputFormat = ({
                        location, dispatch, outputFormat, loading,
                      }) => {
  const query = queryString.parse(location.search)
  const {pathname} = location
  const {
    list, pagination, selectedRowKeys, fileList
  } = outputFormat
  console.log(query)
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
    loading: loading.effects['outputFormat/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: '/customerForm/outputFormat/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem(item) {
      const payload = {optionType: 'update'}
      dispatch(routerRedux.push({
        pathname: "/customerForm/outputFormat/update",
        search: queryString.stringify({
          id: item.id,
          ...payload,
          ...query
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname: "/customerForm/outputFormat/detail",
        search: queryString.stringify({
          id: item.id,
          ...query
        }),
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'outputFormat/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
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
    onShowModal(type) {
      dispatch({
        type: 'user/showModal',
        payload: queryString.stringify({
          id: item.id
        }),
      })
    },
  }

  const buttonGroupProps = {
    importConditon,
    onGoCreate() {
      dispatch(routerRedux.push({
        pathname: "/customerForm/outputFormat/create",
        search: queryString.stringify({
          ...query
        }),
      }))
    },
    onExport() {
      const condition = {
        dataColCode: null,
        dataColName: null,
        isValid: null,
        startTime: null,
        endTime: null,
        datasourceId: null
      }
      for (let item in query) {
        if (item != 'page') {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: 'outputFormat/exportData',
        payload: {
          condition: {...condition}
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
      <List {...listProps} />
    </Page>
  )
}

OutputFormat.propTypes = {
  outputFormat: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({outputFormat, loading}) => ({outputFormat, loading}))(OutputFormat)
