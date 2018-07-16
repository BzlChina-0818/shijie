import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import { Modal } from 'antd'
const confirm = Modal.confirm
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.TODO_LIST

/**
 * @description 我的待办>我的待办
 * @author guoqianyuan
 */
const RegisterTaxProof = ({
  location, dispatch, myTodoList, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, taxTypeList } = myTodoList

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
    loading: loading.effects['myTodoList/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (item) {
      confirm({
        title: '删除',
        content: '确定删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'myTodoList/delete',
            payload: item.id,
          })
            .then(() => {
              handleRefresh({
                page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
              })
            })
        },
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/myTodoList/update",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/myTodoList/detail",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    taxTypeList,
    modalVisible,
    dispatch,
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
        pathname:path+"/myTodoList/create",
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

RegisterTaxProof.propTypes = {
  myTodoList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ myTodoList, loading }) => ({ myTodoList, loading }))(RegisterTaxProof)
