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
const path = PATH.CUSTOMER_FORM
/**
 * @description 动态表单>数据源管理
 * @author guoqianyuan
 */
const DataSource = ({
  location, dispatch, dataSource, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, selectedRowKeys,fileList
  } = dataSource

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
    loading: loading.effects['dataSource/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'dataSource/delete',
        payload: id,
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/dataSource/update",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/dataSource/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onOperate(item,url){
      dispatch(routerRedux.push({
        pathname:path+url,
        search: queryString.stringify({
          datasourceId:item.id,
          datasourceCode:item.datasourceCode
        }),
      }))
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'dataSource/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }
  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onShowModal (type) {
      console.log(type)
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: type,
        },
      })
    },
  }

  const buttonGroupProps={
    goCreate(){
      dispatch(routerRedux.push({
        pathname:path+"/dataSource/create",
      }))
    },
    onExport() {
      const condition = {
        isValid: "",
        datasourceCode: "",
        datasourceName: "",
        startTime: "",
        endTime: ""
      }

      for (let item in query) {
        if (item != 'page') {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: 'dataSource/exportData',
        payload: {
          condition: {...condition}
        }
      })
    },
    onImport(){
      handleRefresh()
    },
  /*  importFile(item) {
      const formData = new FormData();
      formData.append('file', item)
      dispatch({
        type: 'dataSource/importData',
        payload: {
          formData
        }
      })
    },*/
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

DataSource.propTypes = {
  dataSource: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ dataSource, loading }) => ({ dataSource, loading }))(DataSource)
