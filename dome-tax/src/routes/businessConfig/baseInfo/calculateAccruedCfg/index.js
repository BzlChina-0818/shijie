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
const path = PATH.BUS_BASEINFO

/**
 * @description 业务配置>基础信息配置>计算表计提配置管理
 * @author guoqianyuan
 */

const RegisterTaxProof = ({
  location, dispatch, calculateAccruedCfg, loading,
}) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, taxTypeList, currentCoaTypeInput } = calculateAccruedCfg

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
    loading: loading.effects['calculateAccruedCfg/query'],
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
            type: 'calculateAccruedCfg/delete',
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
        pathname:path+"/calculateAccruedCfg/update",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/calculateAccruedCfg/detail",
        search: queryString.stringify({
          id:item.id
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
    taxTypeList,
    currentCoaTypeInput,
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
        pathname:path+"/calculateAccruedCfg/create",
      }))
    },
    onExport() {
      const condition = {
        taxPayerNo: "",
        drSegCode: "",
        crSegCode: "",
        taxNo: "",
      }

      for (let item in locationState) {
        if (item != 'page') {
          condition[item] = locationState[item]
        }
      }
      dispatch({
        type: 'calculateAccruedCfg/exportData',
        payload: {
          ...condition,
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

RegisterTaxProof.propTypes = {
  calculateAccruedCfg: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ calculateAccruedCfg, loading }) => ({ calculateAccruedCfg, loading }))(RegisterTaxProof)
