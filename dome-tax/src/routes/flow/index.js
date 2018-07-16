import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Button} from 'antd'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from '../../components'
import List from './List'

import Modal from './Modal'


const Index = ({
                 flow, dispatch, loading, location,
               }) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys
  } = flow
  const handleRefresh = (newQuery) => {
    console.log(newQuery)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }


  const modalProps = {
    item:  {},
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`flow/create`],
    title: `新增流程模型`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `flow/create`,
        payload: data,
      })
        .then(() => {
        handleRefresh()
      })
    },
    onCancel () {
      dispatch({
        type: 'flow/hideModal',
      })
    },

  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['flow/query'],
    pagination,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'flow/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },

    onIssue(id){
      dispatch({
        type:'flow/issue',
        payload:id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'flow/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onToProcess(){
      dispatch(routerRedux.push({
        pathname:'process'
        }
      ))

    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'flow/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },

  }
  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd () {
      dispatch({
        type: 'flow/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }
  return (<Page inner>
    <Button type="ghost" onClick={filterProps.onAdd} style={{ marginBottom: 8, left:"1140px"}}>新增</Button>
    <List {...listProps}  />
    {modalVisible && <Modal {...modalProps} />}
  </Page>)
}

Index.propTypes = {
  flow: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ flow, loading }) => ({
  flow,
  loading,
}))(Index)
