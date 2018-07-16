import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Modal } from 'antd'
const confirm = Modal.confirm

import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
import { PATH } from "utils"
const path = PATH.VAT_IMPROPERTYINTAX

/**
 * @description 增值税管理>不动产进项税管理>分期抵扣配置
 * @author guoqianyuan
 */
const RegisterTaxProof = ({
  location, dispatch, hirePurchaseConfig, loading,
}) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible } = hirePurchaseConfig

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
    loading: loading.effects['hirePurchaseConfig/query'],
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
            type: 'hirePurchaseConfig/delete',
            payload: item.housedutyCode,
          })
          .then(() => {
            handleRefresh({
              page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
            })
          })
        },
      });


    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/hirePurchaseConfig/update",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/hirePurchaseConfig/detail",
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
        pathname:path+"/hirePurchaseConfig/create",
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
  hirePurchaseConfig: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ hirePurchaseConfig, loading }) => ({ hirePurchaseConfig, loading }))(RegisterTaxProof)
