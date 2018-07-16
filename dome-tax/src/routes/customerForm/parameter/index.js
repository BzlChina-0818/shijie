import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import classnames from 'classnames'
import ButtonGroup from './ButtonGroup'
import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM

/**
 * @description 动态表单>参数逻辑
 * @author linxiaonan + guoqianyuan
 */
const Parameter = ({
                       location, dispatch, parameter, loading,
                     }) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const {
    list, pagination,fileList
  } = parameter
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
    loading: loading.effects['parameter/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onEditItem(newQuery) {
      // const payload = {optionStatus: 'update'}
      dispatch(routerRedux.push({
        pathname: path+'/parameter/update',
        search: queryString.stringify({
          ...locationState,
          id:newQuery.id
        })
        // query:{
        //   ...payload
        // }
      }))

    },
    toDetail(newQuery) {
      dispatch(routerRedux.push({
        pathname: path+'/parameter/detail',
        search: queryString.stringify({
          ...locationState,
          id:newQuery.id
        })
      }))
    },
    // rowSelection: {
    //  // selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'outputFormat/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const buttonGroupProps={
    fileList,
    onGoCreate(){
      dispatch(routerRedux.push({
        pathname:path+"/parameter/create",
        search: queryString.stringify({
          ...locationState
        }),
      }))
    },
/*    onExport() {
      const condition = {
        dataColCode: null,
        dataColName: null,
        isValid: null,
        startTime: null,
        endTime: null,
        datasourceId: null
      }
      console.log(query);
      for (let item in query) {
        if (item != 'page') {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: 'parameter/exportData',
        payload: {
          condition: {...condition}
        }
      })
    },
    Updatefile(file) {
      console.log(file)
      dispatch({
        type: 'parameter/updateState',
        payload: {
          fileList: [file],
        }
      })
    },
    importFile(item) {
      const formData = new FormData();
      formData.append('file', item)
      dispatch({
        type: 'parameter/importData',
        payload: {
          formData
        }
      })
    },*/
    onGoback(){
      history.go(-1)
    }
  }

  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <div>
        <List {...listProps} />
      </div>
    </Page>
  )
}

Parameter.propTypes = {
  invoiceCode: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({parameter, loading}) => ({
  parameter,
  loading,
}))(Parameter)
